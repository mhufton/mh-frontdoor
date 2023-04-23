import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { SummariesRepository } from './summary.repository';
import { Summary } from './schema/summary.schema';
import { FilterQuery, Model } from 'mongoose';
import axios from 'axios';

@Injectable()
export class SummaryService {
  constructor(private readonly summariesRepository: SummariesRepository) {}

  async create(
    text: string,
    createSummaryDto: CreateSummaryDto,
  ): Promise<Summary> {
    console.log('SUMMARY', text);
    let newSummary: string;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };
    const data = {
      model: 'text-davinci-002',
      prompt: `Summarize the following text: ${text}`,
      temperature: 1,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
    console.log('DATA', data);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        data,
        { headers },
      );
      console.log('RESPONSE', response.data);
      newSummary = response.data.choices[0].text.replace(/\n/g, '');
      console.log('SUMMARRRRYYYY', newSummary);
      const summaryToCreate = await this.summariesRepository.createSummary({
        summary: newSummary,
        ...createSummaryDto,
      });
      console.log('SUMMARY TO CREATE', summaryToCreate);
      return summaryToCreate;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // async createTags(text: string): Promise<string[]> {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //   };
  //   const data = {
  //     model: 'davinci',
  //     prompt: `create up to three metadata tags for this text: ${text}`,
  //     temperature: 1,
  //     max_tokens: 5,
  //     top_p: 1,
  //     frequency_penalty: 0,
  //     presence_penalty: 0,
  //   };
  //   try {
  //     const response = await axios.post(
  //       'https://api.openai.com/v1/completions',
  //       data,
  //       { headers },
  //     );
  //     const newTags = response.data.choices[0].text
  //       .replace(/\n/g, '')
  //       .split(',');
  //     console.log('tags inside createTags', newTags);
  //     return newTags;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }

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

  async updateSummaryById(id: string, newTags: string[]): Promise<Summary> {
    const foundSummary = await this.findSummaryById(id);
    const updatedSummary = await this.summariesRepository.updateSummaryById(
      foundSummary,
      newTags,
    );
    return updatedSummary;
  }
}
