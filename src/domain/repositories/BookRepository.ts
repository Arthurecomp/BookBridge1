import { BookEntity } from "../entities/BookEntity";

export interface BookRepository {
  create(book: BookEntity): Promise<BookEntity>;
}
