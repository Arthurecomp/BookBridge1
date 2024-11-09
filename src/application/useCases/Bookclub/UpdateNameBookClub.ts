import { BookClubRepository } from "../../../domain/repositories/BookClubRepository";
import { BookClubEntity } from "../../../domain/entities/BookClubEntity";

export class UpdateClubBookName {
  constructor(private ClubBookRepository: BookClubRepository) {}

  async execute(id: number, name: string): Promise<BookClubEntity> {
    return this.ClubBookRepository.updateName(id, name);
  }
}
