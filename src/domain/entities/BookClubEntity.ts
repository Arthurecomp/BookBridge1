import { UserEntity } from "./UserEntity";

export class BookClubEntity {
  id?: number;
  name: string;
  description: string;
  creatorId: string;
  creator?: UserEntity;

  constructor({
    name,
    description,
    creatorId,
    id,
    creator,
  }: {
    name: string;
    description: string;
    creatorId: string;
    id?: number;
    creator?: UserEntity;
  }) {
    this.name = name;
    this.description = description;
    this.creatorId = creatorId;
    this.id = id;
    this.creator = creator;
  }
}
