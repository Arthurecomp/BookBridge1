import { BookClubEntity } from "./BookClubEntity";
import { OpinionEntity } from "./OpinionEntity";

export class BookEntity {
  id: string;
  title: string;
  author: string;

  constructor(id: string, title: string, author: string) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}
