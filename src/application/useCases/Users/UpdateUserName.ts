import { UserRepository } from "../../../domain/repositories/UserRepository";
import { UserEntity } from "../../../domain/entities/UserEntity";

export class UpdateUserName {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, name: string): Promise<UserEntity> {
    return this.userRepository.updateName(id, name);
  }
}
