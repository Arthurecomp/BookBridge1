import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { OpinionRepository } from "../../domain/repositories/OpinionRepository";
import { CreateOpinion } from "../useCases/Opinion/CreateOpinion";

export class OpinionController {
  private createOpinon: CreateOpinion;
  constructor(opinionRepository: OpinionRepository) {
    this.createOpinon = new CreateOpinion(opinionRepository);
  }

  registerRoutes(fastify: FastifyInstance) {
    fastify.post("/opinion", this.createOpinionHandler.bind(this)); // criar usuários
  }

  async createOpinionHandler(
    request: FastifyRequest<{
      Body: { content: string; rating: number; userId: string; bookId: number };
    }>,
    reply: FastifyReply
  ) {
    try {
      const { content, rating, userId, bookId } = request.body;
      const book = await this.createOpinon.execute({
        content,
        rating,
        userId,
        bookId,
      });
      reply.status(201).send(book);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ error: "Error creating user" });
    }
  }
}

// Handler para criação de usuário
