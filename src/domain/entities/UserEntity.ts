import { BookClubEntity } from "./BookClubEntity";
import { OpinionEntity } from "./OpinionEntity";

export class UserEntity {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;

  // Relacionamentos
  bookClubs?: BookClubEntity[];
  opinions?: OpinionEntity[];
  createdClubs?: BookClubEntity[];

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
    bookClubs?: BookClubEntity[],
    opinions?: OpinionEntity[],
    createdClubs?: BookClubEntity[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.bookClubs = bookClubs;
    this.opinions = opinions;
    this.createdClubs = createdClubs;
  }
}
