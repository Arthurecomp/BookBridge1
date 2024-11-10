import { UserEntity } from "../entities/UserEntity";

export interface UserRepository {
  // create(user: UserEntity): Promise<UserEntity>;
  list(): Promise<UserEntity[]>;
  delete(id: string): Promise<void>;
  updateName(id: string, name: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
