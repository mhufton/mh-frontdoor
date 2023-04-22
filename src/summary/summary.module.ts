import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { Summary, SummarySchema } from './schema/summary.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SummariesRepository } from './summary.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Summary.name, schema: SummarySchema }]),
  ],
  controllers: [SummaryController],
  providers: [SummaryService, SummariesRepository],
})
export class SummaryModule {}
