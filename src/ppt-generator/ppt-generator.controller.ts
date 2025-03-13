import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { MistralService } from 'src/mistral/mistral.service';
import { PptGeneratorService } from './ppt-generator.service';

@Controller('ppt')
export class PptGeneratorController {
  constructor(
    private readonly mistralService: MistralService,
    private readonly pptGeneratorService: PptGeneratorService,
  ) {}

  @Post('generate')
  async generatePpt(
    @Body() body: { topic: string; slideCount: number },
    @Res() res,
  ) {
    try {
      const { topic, slideCount } = body;

      if (!topic || !slideCount || slideCount <= 0) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message:
            'Invalid input. Please provide a valid topic and slide count.',
        });
      }

      // Generate slide content using MistralAI
      const slideContent = await this.mistralService.generateSlideContent(
        topic,
        slideCount,
      );

      // Split slides properly (trim to avoid empty strings)
      const slides = slideContent
        .map((slide) => slide.trim())
        .filter((slide) => slide.length > 0);

      if (slides.length === 0) {
        return res.status(HttpStatus.NO_CONTENT).json({
          message: 'AI generated no valid content.',
        });
      }
      console.log(slides);
      // Generate PowerPoint file using updated pptx-genjs
      const pptBuffer = await this.pptGeneratorService.generatePpt(slides);

      // Send the file as a downloadable response
      res.set({
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': `attachment; filename="generatedPPT.pptx"`,
      });

      return res.status(HttpStatus.OK).send(pptBuffer);
    } catch (error) {
      console.error('Error generating PowerPoint:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to generate PowerPoint file.',
        error: error.message,
      });
    }
  }
}
