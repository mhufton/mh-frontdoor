import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { Summary, SummaryDocument } from './schema/summary.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SummariesRepository {
  constructor(
    @InjectModel(Summary.name) private summary: Model<SummaryDocument>,
  ) {}

  async createSummary(summary: Summary): Promise<Summary> {
    const newSummary = new this.summary(summary);
    return newSummary.save();
  }

  async findSummaryById(summaryQuery: FilterQuery<Summary>): Promise<Summary> {
    return this.summary.findOne(summaryQuery).exec();
  }

  async findSummaryByTag(
    summaryQuery: FilterQuery<Summary>,
  ): Promise<Summary[]> {
    return this.summary.find(summaryQuery).exec();
  }

  async findAllSummaries(): Promise<Summary[]> {
    return this.summary.find().exec();
  }

  async deleteSummaryById(
    summaryQuery: FilterQuery<Summary>,
  ): Promise<Summary> {
    return this.summary.findOneAndDelete(summaryQuery).exec();
  }

  async updateSummaryById(
    summaryQuery: FilterQuery<Summary>,
    newTags: string[],
  ): Promise<SummaryDocument | null> {
    return this.summary
      .findOneAndUpdate(summaryQuery, { tags: newTags })
      .exec();
  }
}
