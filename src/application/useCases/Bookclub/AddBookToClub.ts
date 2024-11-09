import { BookClubRepository } from "../../../domain/repositories/BookClubRepository";
import { BookClubEntity } from "../../../domain/entities/BookClubEntity";

export class AddBookToClub {
  constructor(private ClubBookRepository: BookClubRepository) {}

  async execute(id: number, bookId: number): Promise<BookClubEntity> {
    return this.ClubBookRepository.addBook(id, bookId);
  }
}
