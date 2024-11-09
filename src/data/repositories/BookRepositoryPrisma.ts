import { BookEntity } from "../../domain/entities/BookEntity";
import { BookRepository } from "../../domain/repositories/BookRepository";
import { prisma } from "../database/prisma-client";

export class BookRepositoryPrisma implements BookRepository {
  async create(book: BookEntity): Promise<BookEntity> {
    const createBook = await prisma.book.create({
      data: {
        id: book.id,
        title: book.title,
        author: book.author,
      },
    });
    return createBook;
  }
}
