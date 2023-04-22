import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { SummariesRepository } from './summary.repository';
import { Summary } from './schema/summary.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class SummaryService {
  constructor(private readonly summariesRepository: SummariesRepository) {}

  async create(createSummaryDto: CreateSummaryDto) {
    const summaryToCreate = await this.summariesRepository.createSummary(
      createSummaryDto,
    );
    return summaryToCreate;
  }

  async findSummaryById(id: string): Promise<Summary> {
    const foundSummary = await this.summariesRepository.findSummaryById({ id });

    if (!foundSummary) {
      throw new NotFoundException(`Summary with id: ${id} not found`);
    }

    return foundSummary;
  }

  async findSummaryByTag(tags: string): Promise<Summary[]> {
    const foundSummary = await this.summariesRepository.findSummaryByTag({
      tags,
    });

    if (!foundSummary) {
      throw new NotFoundException(`Summary with tag: ${tags} not found`);
    }

    return foundSummary;
  }

  async findAllSummaries(): Promise<Summary[]> {
    const foundSummaries = await this.summariesRepository.findAllSummaries();
    return foundSummaries;
  }

  async deleteSummary(id: string) {
    return `This action removes a #${id} summary`;
  }
}
