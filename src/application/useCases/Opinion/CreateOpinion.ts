import { OpinionEntity } from "../../../domain/entities/OpinionEntity";
import { OpinionRepository } from "../../../domain/repositories/OpinionRepository";

export class CreateOpinion {
  constructor(private opinionRepository: OpinionRepository) {}

  execute(data: {
    content: string;
    rating: number;
    userId: string;
    bookId: number;
  }): Promise<OpinionEntity> {
    const opinion = new OpinionEntity({
      content: data.content,
      rating: data.rating,
      userId: data.userId,
      bookId: data.bookId,
    });
    return this.opinionRepository.create(opinion);
  }
}
