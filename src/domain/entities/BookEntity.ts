export class BookEntity {
  id?: number;
  title: string;
  author: string;

  constructor({
    id,
    title,
    author,
  }: {
    title: string;
    author: string;
    id?: number;
  }) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}
