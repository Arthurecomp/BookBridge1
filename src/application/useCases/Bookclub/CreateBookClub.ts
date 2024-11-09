import { BookClubEntity } from "../../../domain/entities/BookClubEntity";

import { BookClubRepository } from "../../../domain/repositories/BookClubRepository";

export class CreateBookClub {
  constructor(private bookClubRepository: BookClubRepository) {}

  async execute(data: {
    name: string;
    description: string;
    creatorId: string;
  }): Promise<BookClubEntity> {
    const bookClub = new BookClubEntity({
      name: data.name,
      description: data.description,
      creatorId: data.creatorId,
    });

    return await this.bookClubRepository.create(bookClub);
  }
}
