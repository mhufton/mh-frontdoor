import { Test, TestingModule } from '@nestjs/testing';
import { SummaryService } from './summary.service';
import { SummariesRepository } from './summary.repository';
import { NotFoundException } from '@nestjs/common';
import { Summary } from './schema/summary.schema';
import { SummaryController } from './summary.controller';

describe('SummaryService', () => {
  let service: SummaryService;
  let repository: SummariesRepository;

  const mockSummary: Summary = {
    id: '1',
    summary: 'Mock summary',
    tags: ['tag1', 'tag2'],
    dateCreated: new Date(),
    ownerId: '1234',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummaryController],
      providers: [
        SummaryService,
        {
          provide: SummariesRepository,
          useValue: {
            findSummaryById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SummaryService>(SummaryService);
    repository = module.get<SummariesRepository>(SummariesRepository);
  });

  it('should return a summary when a valid id is provided', async () => {
    jest.spyOn(repository, 'findSummaryById').mockResolvedValue(mockSummary);

    const result = await service.findSummaryById(mockSummary.id);

    expect(repository.findSummaryById).toHaveBeenCalledWith({
      id: mockSummary.id,
    });
    expect(result).toEqual(mockSummary);
  });

  it('should throw a NotFoundException when an invalid id is provided', async () => {
    jest.spyOn(repository, 'findSummaryById').mockResolvedValue(null);

    await expect(service.findSummaryById('invalid_id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
