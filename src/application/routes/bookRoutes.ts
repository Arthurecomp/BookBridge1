import { FastifyInstance } from "fastify";
import { BookRepositoryPrisma } from "../../data/repositories/BookRepositoryPrisma";
import { BookController } from "../controllers/BookController";

export function bookRoutes(fastify: FastifyInstance) {
  const bookRepository = new BookRepositoryPrisma();
  const bookController = new BookController(bookRepository);

  bookController.registerRoutes(fastify);
}
