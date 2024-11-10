import { AuthRepository } from "../../../domain/repositories/AuthRepository";

export class Login {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<string> {
    try {
      return this.authRepository.login(email, password);
    } catch (error) {
      throw new Error("Login failed: " + error);
    }
  }
}
