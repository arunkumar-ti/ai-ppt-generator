import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MistralService {
  private readonly apiUrl = process.env.MISTRAL_BASE_URL;
  private readonly apiKey = process.env.MISTRAL_API_KEY;

  async generateSlideContent(
    topic: string,
    slideCount: number,
  ): Promise<string[]> {
    const prompt = `Generate ${slideCount} slides about "${topic}". Each slide should have a title(preferably short title) and bullet points.`;

    try {
      const response = await axios.post(
        `${this.apiUrl}/v1/chat/completions`,
        {
          model: 'mistral-small', // Options: 'mistral-small', 'mistral-large', 'codestral'
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 800,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const content = response.data.choices[0].message.content;
      return content.split('\n'); // Split slides by paragraph
    } catch (error) {
      console.error('Error generating slide content:', error);
      throw new Error('Failed to generate slide content.');
    }
  }
}
