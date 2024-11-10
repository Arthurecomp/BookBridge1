import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import authMiddleware from "../middlewares/authMiddleware";
import { CreateBook } from "../useCases/Book/CreateBook";
import { BookRepositoryPrisma } from "../../data/repositories/BookRepositoryPrisma";

export class BookController {
  private createBook: CreateBook;

  constructor(bookRepository: BookRepositoryPrisma) {
    this.createBook = new CreateBook(bookRepository);
  }

  registerRoutes(fastify: FastifyInstance) {
    fastify.post(
      "/book",
      { preHandler: authMiddleware },
      this.createBookHandler.bind(this)
    ); // criar usuários
  }

  // Handler para criação de usuário
  async createBookHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { title } = request.body as { title: string }; // Agora o TypeScript sabe que `params` tem um campo `id` do tipo string
      const { author } = request.body as { author: string };
      const book = await this.createBook.execute({ title, author });
      reply.status(201).send(book);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ error: "Error creating user" });
    }
  }
}
