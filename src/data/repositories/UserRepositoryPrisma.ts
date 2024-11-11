import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserEntity } from "../../domain/entities/UserEntity";
import { prisma } from "../database/prisma-client";

export class UserPrismaRepository implements UserRepository {
  async list(): Promise<UserEntity[]> {
    const users = await prisma.user.findMany({
      include: {
        bookClubs: true,
        createdClubs: true,
      },
    });
    return users;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    return existingUser;
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
