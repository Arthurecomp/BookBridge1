import { BookClubRepository } from "../../../domain/repositories/BookClubRepository";

export class DeleteBookClub {
  constructor(private bookClubRepository: BookClubRepository) {}

  async execute(id: number): Promise<void> {
    return this.bookClubRepository.delete(id);
  }
}
