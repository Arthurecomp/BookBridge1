import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { CreateBookClub } from "../useCases/Bookclub/CreateBookClub";
import { BookClubPrismaRepository } from "../../data/repositories/BookClubRepositoryPrisma";
import { DeleteBookClub } from "../useCases/Bookclub/DeleteBookClub";
import { ListBookClub } from "../useCases/Bookclub/ListBookclub";
import { UpdateClubBookName } from "../useCases/Bookclub/UpdateNameBookClub";
import { AddMemberClubBook } from "../useCases/Bookclub/AddMemberBookClub";
import { AddBookToClub } from "../useCases/Bookclub/AddBookToClub";
import { DeleteBookFromClub } from "../useCases/Bookclub/DeleteBookFromClub";
import authMiddleware from "../middlewares/authMiddleware";

export class BookClubController {
  private createBookClube: CreateBookClub;
  private listBookClub: ListBookClub;
  private deleteBookClub: DeleteBookClub;
  private updateNameBookClub: UpdateClubBookName;
  private addMemberBookClub: AddMemberClubBook;
  private addBooktoClub: AddBookToClub;
  private deleteBookFromClub: DeleteBookFromClub;

  constructor(bookClubRepository: BookClubPrismaRepository) {
    this.deleteBookFromClub = new DeleteBookFromClub(bookClubRepository);
    this.addBooktoClub = new AddBookToClub(bookClubRepository);
    this.createBookClube = new CreateBookClub(bookClubRepository);
    this.listBookClub = new ListBookClub(bookClubRepository);
    this.deleteBookClub = new DeleteBookClub(bookClubRepository);
    this.updateNameBookClub = new UpdateClubBookName(bookClubRepository);
    this.addMemberBookClub = new AddMemberClubBook(bookClubRepository);
  }

  registerRoutes(fastify: FastifyInstance) {
    fastify.post(
      "/bookClub",
      { preHandler: authMiddleware },
      this.createBookClubHandler.bind(this)
    ); // criar usuários
    fastify.get(
      "/bookClub",
      { preHandler: authMiddleware },
      this.listBookClubHandler.bind(this)
    ); // Listar todos os usuários
    fastify.put(
      "/bookClub/:id",
      { preHandler: authMiddleware },
      this.updateBookClubNameHandler.bind(this)
    ); // Atualizar nome do usuário
    fastify.delete(
      "/bookClub/:id",
      { preHandler: authMiddleware },
      this.deleteUserHandler.bind(this)
    ); // Deletar usuário
    fastify.put(
      "/addMember/:id",
      { preHandler: authMiddleware },
      this.addMemberHandler.bind(this)
    );
    fastify.put(
      "/bookClub/:id/addBook",
      { preHandler: authMiddleware },
      this.addBookHandler.bind(this)
    );
    fastify.delete(
      "/bookClub/:id/deleteBook",
      { preHandler: authMiddleware },
      this.deleteBookHandler.bind(this)
    );
  }

  // Handler para criação de clube de leitura
  async createBookClubHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name } = request.body as { name: string };
      const { description } = request.body as { description: string };
      const { creatorId } = request.body as { creatorId: string };
      const bookClub = await this.createBookClube.execute({
        name,
        description,
        creatorId,
      });
      console.log("oi");
      reply.status(201).send(bookClub);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ error: "Error creating book club" });
    }
  }

  //listar todos os clubes de leitura
  async listBookClubHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const bookClubs = await this.listBookClub.execute();
      reply.status(200).send(bookClubs);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Error retrieving users" });
    }
  }

  //deletar club de leitura
  async deleteUserHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const bookClubId = Number(id);
      await this.deleteBookClub.execute(bookClubId);
      reply.status(200).send({ message: "Book Club deleted successfully" });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: error || "Book Club NOT  FOUND" });
    }
  }

  async updateBookClubNameHandler(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params as { id: string };
      const bookClubId = Number(id);
      const { name } = request.body as { name: string };
      if (!name) {
        return reply.status(400).send({ error: "Name is required" });
      }
      const updatedUser = await this.updateNameBookClub.execute(
        bookClubId,
        name
      );
      reply.status(200).send(updatedUser);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Error updating user" });
    }
  }

  async addMemberHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      //O PARAMETRO VAI SER O ID DO CLUBE, E NO CORPO DA REQUISIÇÃO VAI SER O ID DO USUÁRIO
      const bookClubId = Number(id);
      const { userId } = request.body as { userId: string };
      const updatedUser = await this.addMemberBookClub.execute(
        bookClubId,
        userId
      );
      reply.status(200).send(updatedUser);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Error updating user" });
    }
  }

  async addBookHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      //O PARAMETRO VAI SER O ID DO CLUBE, E NO CORPO DA REQUISIÇÃO VAI SER O ID DO USUÁRIO
      const bookClubId = Number(id);
      const { bookId } = request.body as { bookId: number };

      const updatedBook = await this.addBooktoClub.execute(bookClubId, bookId);
      reply.status(200).send(updatedBook);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Error updating user" });
    }
  }
  async deleteBookHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      //O PARAMETRO VAI SER O ID DO CLUBE, E NO CORPO DA REQUISIÇÃO VAI SER O ID DO USUÁRIO
      const bookClubId = Number(id);
      const { bookId } = request.body as { bookId: number };
      const updatedBook = await this.deleteBookFromClub.execute(
        bookClubId,
        bookId
      );
      reply.status(200).send(updatedBook);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Error updating user" });
    }
  }
}
