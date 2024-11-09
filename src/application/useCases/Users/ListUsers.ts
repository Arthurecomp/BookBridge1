import { UserEntity } from "../../../domain/entities/UserEntity";
import { UserRepository } from "../../../domain/repositories/UserRepository";
export class ListUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<UserEntity[]> {
    return this.userRepository.list();
  }
}
