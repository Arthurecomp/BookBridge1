import { BookClubRepository } from "../../../domain/repositories/BookClubRepository";
import { BookClubEntity } from "../../../domain/entities/BookClubEntity";

export class AddMemberClubBook {
  constructor(private BookClubRepository: BookClubRepository) {}

  async execute(id: number, userId: string): Promise<BookClubEntity> {
    return this.BookClubRepository.addMember(id, userId);
  }
}
