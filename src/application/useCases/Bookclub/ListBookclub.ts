import { BookClubEntity } from "../../../domain/entities/BookClubEntity";
import { BookClubRepository } from "../../../domain/repositories/BookClubRepository";

export class ListBookClub {
  constructor(private bookClubRepository: BookClubRepository) {}

  async execute(): Promise<BookClubEntity[]> {
    return this.bookClubRepository.list();
  }
}
