import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { CreateBookClub } from "../useCases/Bookclub/CreateBookClub";
import { BookClubPrismaRepository } from "../../data/repositories/BookClubRepositoryPrisma";
import { DeleteBookClub } from "../useCases/Bookclub/DeleteBookClub";
import { ListBookClub } from "../useCases/Bookclub/ListBookclub";
import { UpdateClubBookName } from "../useCases/Bookclub/UpdateNameBookClub";
import { AddMemberClubBook } from "../useCases/Bookclub/AddMemberBookClub";
import { AddBookToClub } from "../useCases/Bookclub/AddBookToClub";
import { DeleteBookFromClub } from "../useCases/Bookclub/DeleteBookFromClub";

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
    fastify.post("/bookClub", this.createBookClubHandler.bind(this)); // criar usuários
    fastify.get("/bookClub", this.listBookClubHandler.bind(this)); // Listar todos os usuários
    fastify.put("/bookClub/:id", this.updateBookClubNameHandler.bind(this)); // Atualizar nome do usuário
    fastify.delete("/bookClub/:id", this.deleteUserHandler.bind(this)); // Deletar usuário
    fastify.put("/addMember/:id", this.addMemberHandler.bind(this));
    fastify.put("/bookClub/:id/addBook", this.addBookHandler.bind(this));
    fastify.delete(
      "/bookClub/:id/deleteBook",
      this.deleteBookHandler.bind(this)
    );
  }

  // Handler para criação de clube de leitura
  async createBookClubHandler(
    request: FastifyRequest<{
      Body: { name: string; description: string; creatorId: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const { name, description, creatorId } = request.body;
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
  async deleteUserHandler(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const bookClubId = Number(id);
      await this.deleteBookClub.execute(bookClubId);
      reply.status(200).send({ message: "Book Club deleted successfully" });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: error || "Book Club NOT  FOUND" });
    }
  }

  async updateBookClubNameHandler(
    request: FastifyRequest<{ Params: { id: string }; Body: { name: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const bookClubId = Number(id);
      const { name } = request.body;
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

  async addMemberHandler(
    request: FastifyRequest<{
      Params: { id: string };
      Body: { userId: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      //O PARAMETRO VAI SER O ID DO CLUBE, E NO CORPO DA REQUISIÇÃO VAI SER O ID DO USUÁRIO
      const bookClubId = Number(id);
      const { userId } = request.body;
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

  async addBookHandler(
    request: FastifyRequest<{
      Params: { id: string };
      Body: { bookId: number };
    }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      //O PARAMETRO VAI SER O ID DO CLUBE, E NO CORPO DA REQUISIÇÃO VAI SER O ID DO USUÁRIO
      const bookClubId = Number(id);
      const { bookId } = request.body;

      const updatedBook = await this.addBooktoClub.execute(bookClubId, bookId);
      reply.status(200).send(updatedBook);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Error updating user" });
    }
  }
  async deleteBookHandler(
    request: FastifyRequest<{
      Params: { id: string };
      Body: { bookId: number };
    }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      //O PARAMETRO VAI SER O ID DO CLUBE, E NO CORPO DA REQUISIÇÃO VAI SER O ID DO USUÁRIO
      const bookClubId = Number(id);
      const { bookId } = request.body;
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
