import { BookClubEntity } from "./BookClubEntity";
import { BookEntity } from "./BookEntity";
import { UserEntity } from "./UserEntity";

export class OpinionEntity {
  id: number;
  content: string;
  rating: number;
  userId: string;
  bookId: number;
  bookClubId: number;
  data?: Date;

  // Relacionamentos
  user?: UserEntity;
  book?: BookEntity;
  bookClub?: BookClubEntity;

  constructor(
    id: number,
    content: string,
    rating: number,
    userId: string,
    bookId: number,
    bookClubId: number,
    data?: Date,
    user?: UserEntity,
    book?: BookEntity,
    bookClub?: BookClubEntity
  ) {
    this.id = id;
    this.content = content;
    this.rating = rating;
    this.userId = userId;
    this.bookId = bookId;
    this.bookClubId = bookClubId;
    this.data = data;
    this.user = user;
    this.book = book;
    this.bookClub = bookClub;
  }
}
