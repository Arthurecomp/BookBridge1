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
import { getCachedData } from "../../service/cacheService";

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
    );
    fastify.get(
      "/bookClub",
      { preHandler: authMiddleware },
      this.listBookClubHandler.bind(this)
    );
    fastify.put(
      "/bookClub/:id",
      { preHandler: authMiddleware },
      this.updateBookClubNameHandler.bind(this)
    );
    fastify.delete(
      "/bookClub/:id",
      { preHandler: authMiddleware },
      this.deleteUserHandler.bind(this)
    );
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
      const { name, description, creatorId } = request.body as {
        name: string;
        description: string;
        creatorId: string;
      };
      request.log.info(`Tentando criar clube de leitura com nome: ${name}`);
      const bookClub = await this.createBookClube.execute({
        name,
        description,
        creatorId,
      });
      request.log.info(`Clube de leitura criado com sucesso: ${bookClub.name}`);
      reply.status(201).send(bookClub);
    } catch (error) {
      request.log.error(`Erro ao criar clube de leitura: ${error}`);
      reply.status(400).send({ error: "Erro ao criar o clube de leitura" });
    }
  }

  // Listar todos os clubes de leitura
  async listBookClubHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      request.log.info(
        "Solicitação recebida para listar todos os clubes de leitura"
      );
      const cachKey = "bookClubs";

      const bookClubs = await getCachedData(cachKey, async () => {
        return this.listBookClub.execute();
      });

      request.log.info(
        `Foram encontrados ${bookClubs.length} clubes de leitura`
      );
      reply.status(200).send(bookClubs);
    } catch (error) {
      request.log.error(`Erro ao listar clubes de leitura: ${error}`);
      reply
        .status(500)
        .send({ error: "Erro ao recuperar os clubes de leitura" });
    }
  }

  // Deletar clube de leitura
  async deleteUserHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const bookClubId = Number(id);
      request.log.info(
        `Tentando deletar o clube de leitura com id: ${bookClubId}`
      );
      await this.deleteBookClub.execute(bookClubId);
      request.log.info(`Clube de leitura ${bookClubId} deletado com sucesso`);
      reply
        .status(200)
        .send({ message: "Clube de leitura deletado com sucesso" });
    } catch (error) {
      request.log.error(`Erro ao deletar clube de leitura  ${error}`);
      reply.status(500).send({ error: "Clube de leitura não encontrado" });
    }
  }

  // Atualizar nome do clube de leitura
  async updateBookClubNameHandler(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params as { id: string };
      const bookClubId = Number(id);
      const { name } = request.body as { name: string };
      if (!name) {
        request.log.warn(
          "Nome é obrigatório para atualizar o clube de leitura"
        );
        return reply.status(400).send({ error: "Nome é obrigatório" });
      }
      request.log.info(
        `Atualizando nome do clube de leitura ${bookClubId} para: ${name}`
      );
      const updatedBookClub = await this.updateNameBookClub.execute(
        bookClubId,
        name
      );
      request.log.info(
        `Nome do clube de leitura ${bookClubId} atualizado com sucesso`
      );
      reply.status(200).send(updatedBookClub);
    } catch (error) {
      request.log.error(
        `Erro ao atualizar o nome do clube de leitura ${error}`
      );
      reply.status(500).send({ error: "Erro ao atualizar o clube de leitura" });
    }
  }

  // Adicionar membro ao clube de leitura
  async addMemberHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const bookClubId = Number(id);
      const { userId } = request.body as { userId: string };
      request.log.info(
        `Tentando adicionar o usuário ${userId} ao clube de leitura ${bookClubId}`
      );
      const updatedBookClub = await this.addMemberBookClub.execute(
        bookClubId,
        userId
      );
      request.log.info(
        `Usuário ${userId} adicionado ao clube de leitura ${bookClubId}`
      );
      reply.status(200).send(updatedBookClub);
    } catch (error) {
      request.log.error(
        `Erro ao adicionar usuário ao clube de leitura: ${error}`
      );
      reply
        .status(500)
        .send({ error: "Erro ao adicionar membro ao clube de leitura" });
    }
  }

  // Adicionar livro ao clube de leitura
  async addBookHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const bookClubId = Number(id);
      const { bookId } = request.body as { bookId: number };
      request.log.info(
        `Tentando adicionar o livro ${bookId} ao clube de leitura ${bookClubId}`
      );
      const updatedBookClub = await this.addBooktoClub.execute(
        bookClubId,
        bookId
      );
      request.log.info(
        `Livro ${bookId} adicionado ao clube de leitura ${bookClubId}`
      );
      reply.status(200).send(updatedBookClub);
    } catch (error) {
      request.log.error(
        `Erro ao adicionar livro ao clube de leitura: ${error}`
      );
      reply
        .status(500)
        .send({ error: "Erro ao adicionar livro ao clube de leitura" });
    }
  }

  // Deletar livro do clube de leitura
  async deleteBookHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const bookClubId = Number(id);
      const { bookId } = request.body as { bookId: number };
      request.log.info(
        `Tentando deletar o livro ${bookId} do clube de leitura ${bookClubId}`
      );
      const updatedBookClub = await this.deleteBookFromClub.execute(
        bookClubId,
        bookId
      );
      request.log.info(
        `Livro ${bookId} deletado do clube de leitura ${bookClubId}`
      );
      reply.status(200).send(updatedBookClub);
    } catch (error) {
      request.log.error(`Erro ao deletar livro do clube de leitura`);
      reply
        .status(500)
        .send({ error: "Erro ao deletar livro do clube de leitura" });
    }
  }
}
