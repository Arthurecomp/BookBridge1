export class OpinionEntity {
  id?: number;
  content: string;
  rating: number;
  userId: string;
  bookId: number;

  constructor({
    id,
    content,
    rating,
    userId,
    bookId,
  }: {
    id?: number;
    content: string;
    rating: number;
    userId: string;
    bookId: number;
  }) {
    this.id = id;
    this.content = content;
    this.rating = rating;
    this.userId = userId;
    this.bookId = bookId;
  }
}
