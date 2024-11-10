import { UserEntity } from "../entities/UserEntity";

export interface AuthRepository {
  login(email: string, password: string): Promise<string>;
  findByEmail(email: string): Promise<UserEntity | null>;
  create(user: UserEntity): Promise<UserEntity>;
}
