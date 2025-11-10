import { GoogleGenAI } from '@google/genai';
import { FormData, Recommendation } from '../types';
import { fileToBase64 } from '../utils/fileUtils';
import { PROMPT_PREAMBLE } from '../constants';
import { inToCm, lbsToKg } from '../utils/conversionUtils';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getMetricValue = (value: string, unit: 'cm' | 'in' | 'kg' | 'lbs'): number | null => {
    if (!value) return null;
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return null;
    if (unit === 'in') return inToCm(numericValue);
    if (unit === 'lbs') return lbsToKg(numericValue);
    return numericValue;
};

export const getFitRecommendation = async (
  formData: FormData,
  imageFile: File | null
): Promise<Recommendation> => {
  // FIX: Switched to gemini-2.5-flash as it is sufficient for this task and more cost-effective.
  const geminiModel = 'gemini-2.5-flash';

  // Convert all inputs to metric for the prompt
  const heightCm = getMetricValue(formData.height, formData.heightUnit);
  const weightKg = getMetricValue(formData.weight, formData.weightUnit);
  const chestCm = getMetricValue(formData.chest, formData.chestUnit);
  const waistCm = getMetricValue(formData.waist, formData.waistUnit);

  const userPrompt = `
**User Input Data (all values converted to metric):**
- Gender: ${formData.gender}
- Height: ${heightCm?.toFixed(1)} cm
- Weight: ${weightKg?.toFixed(1)} kg
- Body Type: ${formData.bodyType}
- Fit Preference: ${formData.fitPreference}
- Garment Type: ${formData.garmentType}
${chestCm ? `- Chest: ${chestCm.toFixed(1)} cm (user-provided)` : ''}
${waistCm ? `- Waist: ${waistCm.toFixed(1)} cm (user-provided)` : ''}
- ${imageFile ? 'A full-body image is provided for visual analysis.' : 'No image was provided.'}
`;

  const fullPrompt = PROMPT_PREAMBLE + userPrompt;

  const parts: any[] = [{ text: fullPrompt }];

  if (imageFile) {
    const base64Image = await fileToBase64(imageFile);
    parts.push({
      inlineData: {
        mimeType: imageFile.type,
        data: base64Image,
      },
    });
  }

  // FIX: `responseText` is declared here to be accessible in the catch block for debugging.
  let responseText = '';
  try {
    const result = await ai.models.generateContent({
      model: geminiModel,
      // FIX: The 'contents' field should be a single Content object for a multimodal prompt.
      contents: { parts },
      config: {
        responseMimeType: "application/json",
      },
    });

    responseText = result.text;
    
    // FIX: Add robust JSON parsing to handle potential markdown fences.
    let jsonText = responseText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.substring(7);
      if (jsonText.endsWith('```')) {
        jsonText = jsonText.slice(0, -3);
      }
    }
    
    const parsedResponse: Recommendation = JSON.parse(jsonText);
    return parsedResponse;
  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
       throw new Error("The provided API key is not valid. Please check your configuration.");
    }
    if (error instanceof SyntaxError) {
      console.error("Response from model was not valid JSON.", responseText);
      throw new Error("The AI returned a response in an unexpected format. Please try again.");
    }
    throw new Error("Failed to get a recommendation. Please check your inputs and try again.");
  }
};
