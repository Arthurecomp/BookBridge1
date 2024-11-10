import { UserEntity } from "../../../domain/entities/UserEntity";
import { AuthRepository } from "../../../domain/repositories/AuthRepository";

export class CreateUser {
  constructor(private authRepository: AuthRepository) {}

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

    return await this.authRepository.create(user);
  }
}
