import { UserEntity } from "../../../domain/entities/UserEntity";
import { UserRepository } from "../../../domain/repositories/UserRepository";
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<UserEntity> {
    const user = new UserEntity({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    return await this.userRepository.create(user);
  }
}
