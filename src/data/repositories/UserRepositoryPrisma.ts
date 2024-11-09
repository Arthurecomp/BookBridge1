import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserEntity } from "../../domain/entities/UserEntity";
import { prisma } from "../database/prisma-client";

export class UserPrismaRepository implements UserRepository {
  async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
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

  async list(): Promise<UserEntity[]> {
    const users = await prisma.user.findMany({
      include: {
        bookClubs: true,
        createdClubs: true,
      },
    });
    return users;
  }

  async findByEmail(email: string): Promise<string> {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (!existingUser) {
      throw new Error(`User with email ${email} not found`);
    } else {
      return existingUser.id;
    }
  }

  async delete(id: string): Promise<void> {
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new Error(`User with ID ${id} not found`);
    }
    await prisma.user.delete({
      where: { id },
    });
  }

  async updateName(id: string, name: string): Promise<UserEntity> {
    const updateUser = await prisma.user.update({
      where: { id },
      data: { name },
      include: {
        bookClubs: true,
        createdClubs: true,
      },
    });
    return updateUser;
  }
}
