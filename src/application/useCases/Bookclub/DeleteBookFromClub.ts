import { BookClubRepository } from "../../../domain/repositories/BookClubRepository";
import { BookClubEntity } from "../../../domain/entities/BookClubEntity";

export class DeleteBookFromClub {
  constructor(private ClubBookRepository: BookClubRepository) {}

  async execute(id: number, bookId: number): Promise<BookClubEntity> {
    return this.ClubBookRepository.deleteBook(id, bookId);
  }
}
