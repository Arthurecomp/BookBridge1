import { BookClubEntity } from "../entities/BookClubEntity";

export interface BookClubRepository {
  create(bookClub: BookClubEntity): Promise<BookClubEntity>;
  list(): Promise<BookClubEntity[]>;
  delete(id: number): Promise<void>;
  updateName(id: number, title: string): Promise<BookClubEntity>;
  addMember(id: number, userId: string): Promise<BookClubEntity>;
  addBook(id: number, bookId: number): Promise<BookClubEntity>;
  deleteBook(id: number, bookId: number): Promise<BookClubEntity>;
}
