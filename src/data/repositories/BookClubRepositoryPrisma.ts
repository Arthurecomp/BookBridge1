import { BookClubRepository } from "../../domain/repositories/BookClubRepository";
import { BookClubEntity } from "../../domain/entities/BookClubEntity";
import { prisma } from "../database/prisma-client";

export class BookClubPrismaRepository implements BookClubRepository {
  async create(bookClub: BookClubEntity): Promise<BookClubEntity> {
    const createdBookClub = await prisma.bookClub.create({
      data: {
        id: bookClub.id,
        name: bookClub.name,
        description: bookClub.description,
        creatorId: bookClub.creatorId,
      },
      include: {
        creator: true,
      },
    });
    return createdBookClub;
  }

  async list(): Promise<BookClubEntity[]> {
    const bookClubs = await prisma.bookClub.findMany({
      include: {
        books: true,
        members: true,
      },
    });
    return bookClubs;
  }

  async delete(id: number): Promise<void> {
    const existingBookClub = await prisma.bookClub.findUnique({
      where: { id },
    });
    if (!existingBookClub) {
      throw new Error(`User with ID ${id} not found`);
    }
    await prisma.bookClub.delete({
      where: { id },
    });
  }

  async updateName(id: number, name: string): Promise<BookClubEntity> {
    const updateBookClub = await prisma.bookClub.update({
      where: { id },
      data: {
        name,
      },
      include: {
        books: true,
        members: true,
      },
    });
    return updateBookClub;
  }

  async addMember(id: number, userId: string): Promise<BookClubEntity> {
    const updateBookClub = await prisma.bookClub.update({
      where: {
        id,
      },
      data: {
        members: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return updateBookClub;
  }
}
