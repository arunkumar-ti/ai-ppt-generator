import { Injectable } from '@nestjs/common';
const PptxGenJS = require('pptxgenjs');

@Injectable()
export class PptGeneratorService {
  async generatePpt(slideData: string[]): Promise<Buffer> {
    const pptx = new PptxGenJS();

    if (slideData.length === 0) {
      slideData = ['No content generated'];
    }

    // Group slide content
    const groupedSlides: string[][] = [];
    let currentSlide: string[] = [];

    slideData.forEach((line) => {
      if (line.startsWith('Slide')) {
        if (currentSlide.length > 0) {
          groupedSlides.push(currentSlide);
        }
        currentSlide = [line];
      } else {
        currentSlide.push(line);
      }
    });

    if (currentSlide.length > 0) {
      groupedSlides.push(currentSlide);
    }

    // Create slides based on grouped data
    groupedSlides.forEach((slideContent) => {
      const slide = pptx.addSlide();

      // Add background
      slide.background = { color: 'FFFFFF' };

      // Add title
      slide.addText(slideContent[0], {
        x: '5%',
        y: '5%',
        w: '90%',
        fontSize: 28,
        color: '0000FF',
        bold: true,
        align: 'center',
      });

      // Add bullet points
      const bulletPoints = slideContent
        .slice(1)
        .map((point) => `${point}`)
        .join('\n');

      // Handle overflow and dynamic font size
      const fontSize = bulletPoints.length > 500 ? 20 : 24;
      const maxLength = 800;

      if (bulletPoints.length > maxLength) {
        const parts = bulletPoints.match(/(.|[\r\n]){1,800}/g) || [];
        parts.forEach((part, i) => {
          const subSlide = pptx.addSlide();

          subSlide.addText(`${slideContent[0]} (Part ${i + 1})`, {
            x: '5%',
            y: '5%',
            w: '90%',
            fontSize: 28,
            color: '0000FF',
            bold: true,
            align: 'center',
          });

          subSlide.addText(part, {
            x: '5%',
            y: '20%',
            w: '90%',
            h: '65%',
            fontSize: fontSize - 2,
            color: '000000',
            align: 'left',
            valign: 'top',
          });
        });
      } else {
        slide.addText(bulletPoints, {
          x: '5%',
          y: '20%',
          w: '90%',
          h: '65%',
          fontSize,
          color: '000000',
          align: 'left',
          valign: 'top',
        });
      }
    });

    const data = (await pptx.write({ outputType: 'uint8array' })) as Uint8Array;
    return Buffer.from(data);
  }
}
