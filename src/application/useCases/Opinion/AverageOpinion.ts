import { OpinionRepository } from "../../../domain/repositories/OpinionRepository";

export class AverageOpinion {
  constructor(private opinionRepository: OpinionRepository) {}

  execute(bookId: number): Promise<number> {
    return this.opinionRepository.averageRating(bookId);
  }
}
