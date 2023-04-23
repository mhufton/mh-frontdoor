// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { CreateSummaryDto } from './dto/create-summary.dto';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Post()
  async create(
    @Body() body: { text: string; createSummaryDto: CreateSummaryDto },
  ) {
    const { text, createSummaryDto } = body;
    const newSummary = await this.summaryService.create(text, createSummaryDto);
    return newSummary;
  }

  @Get()
  async findAllSummaries() {
    return this.summaryService.findAllSummaries();
  }

  @Get(':id')
  async findSummaryById(@Param('id') id: string) {
    const foundSummary = await this.summaryService.findSummaryById(id);
    return foundSummary;
  }

  @Get(':tag')
  async findSummaryByTag(@Param('tag') tag: string) {
    const foundSummary = await this.summaryService.findSummaryByTag(tag);
    return foundSummary;
  }

  @Delete(':id')
  async deleteSummary(@Param('id') id: string) {
    return this.summaryService.deleteSummary(id);
  }
}
