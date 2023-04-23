import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import axios from 'axios';

@ApiTags('openai')
@Controller('openai')
export class OpenAiController {
  // @Post('/')
  // async summarize(@Body() { text }: { text: string }): Promise<string> {
  //   const summarizedText = await new OpenAiService().generateSummary(text);
  //   return summarizedText;
  // }
}
