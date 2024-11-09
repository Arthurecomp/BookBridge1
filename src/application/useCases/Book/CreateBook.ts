import { BookRepository } from "../../../domain/repositories/BookRepository";
import { BookEntity } from "../../../domain/entities/BookEntity";

export class CreateBook {
  constructor(private bookRepository: BookRepository) {}

  async execute(data: { title: string; author: string }): Promise<BookEntity> {
    const book = new BookEntity({
      title: data.title,
      author: data.author,
    });
    return this.bookRepository.create(book);
  }
}
