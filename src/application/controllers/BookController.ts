import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { CreateBook } from "../useCases/Book/CreateBook";
import { BookRepositoryPrisma } from "../../data/repositories/BookRepositoryPrisma";

export class BookController {
  private createBook: CreateBook;

  constructor(bookRepository: BookRepositoryPrisma) {
    this.createBook = new CreateBook(bookRepository);
  }

  registerRoutes(fastify: FastifyInstance) {
    fastify.post("/book", this.createBookHandler.bind(this)); // criar usuários
  }

  // Handler para criação de usuário
  async createBookHandler(
    request: FastifyRequest<{
      Body: { title: string; author: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const { title, author } = request.body;
      const book = await this.createBook.execute({ title, author });
      reply.status(201).send(book);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ error: "Error creating user" });
    }
  }
}
