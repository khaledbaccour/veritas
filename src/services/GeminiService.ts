import { GoogleGenAI } from '@google/genai';

export class GeminiService {
  private ai: any;
  private model = 'gemini-2.5-flash-preview-04-17';
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.ai = new GoogleGenAI({
      apiKey,
    });
  }
  
  async generateContent(prompt: string): Promise<string> {
    const config = {
      responseMimeType: 'text/plain',
    };
    
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];

    try {
      let fullText = '';
      const response = await this.ai.models.generateContentStream({
        model: this.model,
        config,
        contents,
      });
      
      for await (const chunk of response) {
        fullText += chunk.text;
      }
      
      return fullText;
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  }
}
