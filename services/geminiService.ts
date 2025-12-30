
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, MealType } from "../types";

export const generateRecipe = async (ingredients: string[], mealType: MealType): Promise<Recipe> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Create a creative and delicious ${mealType} recipe using some or all of these ingredients: ${ingredients.join(', ')}. 
  The recipe should be practical for a home cook. Provide a chef's tip at the end.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          estimatedTime: { type: Type.STRING },
          difficulty: { 
            type: Type.STRING,
            enum: ['Easy', 'Medium', 'Hard']
          },
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                item: { type: Type.STRING },
                amount: { type: Type.STRING }
              },
              required: ['item', 'amount']
            }
          },
          instructions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          chefTip: { type: Type.STRING }
        },
        required: ['title', 'estimatedTime', 'difficulty', 'ingredients', 'instructions']
      }
    }
  });

  try {
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as Recipe;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Could not understand the chef's response. Please try again.");
  }
};

export const generateRecipeImage = async (recipeTitle: string, ingredients: string[]): Promise<string | undefined> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `A professional, high-end food photography shot of a gourmet dish called "${recipeTitle}". 
  It features ingredients like ${ingredients.slice(0, 3).join(', ')}. 
  The image should have cinematic lighting, elegant presentation on a dark, minimalist plate, and a sophisticated noir atmosphere. 
  4k resolution, highly detailed textures.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return undefined;
  } catch (error) {
    console.error("Failed to generate recipe image:", error);
    return undefined;
  }
};
