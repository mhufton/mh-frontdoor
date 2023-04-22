export class CreateSummaryDto {
  id: string;
  summary: string;
  tags: string[];
  dateCreated: Date;
  ownerId: string;
}
