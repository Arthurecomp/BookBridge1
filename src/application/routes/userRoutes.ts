// src/application/routes/userRoutes.ts
import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UserController";
import { UserPrismaRepository } from "../../data/repositories/UserRepositoryPrisma";

export function userRoutes(fastify: FastifyInstance) {
  const userRepository = new UserPrismaRepository();

  const userController = new UserController(userRepository);

  userController.registerRoutes(fastify);
}
