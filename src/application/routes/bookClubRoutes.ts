import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/UserController";
import { UserPrismaRepository } from "../../data/repositories/UserRepositoryPrisma";
import { BookClubController } from "../controllers/BookClubController";
import { BookClubPrismaRepository } from "../../data/repositories/BookClubRepositoryPrisma";

export function bookClubRoutes(fastify: FastifyInstance) {
  const bookClubRepository = new BookClubPrismaRepository();
  const bookClubController = new BookClubController(bookClubRepository);

  bookClubController.registerRoutes(fastify);
}
