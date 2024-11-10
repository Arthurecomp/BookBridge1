import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { UserEntity } from "../../domain/entities/UserEntity";
import bcrypt from "bcryptjs";
import { prisma } from "../database/prisma-client";
import jwt from "jsonwebtoken"; // Para usar a funcionalidade de JWT

export class AuthRepositoryPrisma implements AuthRepository {
  async create(user: UserEntity): Promise<UserEntity> {
    const userExist = await this.findByEmail(user.email);
    if (userExist) {
      throw new Error("This emails was already by another user");
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      include: {
        opinions: true,
        bookClubs: true,
        createdClubs: true,
      },
    });
    return createdUser;
  }

  // Método de login que retorna um token
  async login(email: string, password: string): Promise<string> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Verifica se a senha está correta
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      throw new Error("Wrong password");
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, "meuSegredo");
    return token;
  }

  // Método para buscar o usuário pelo email
  async findByEmail(email: string): Promise<UserEntity | null> {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    return existingUser;
  }
}
