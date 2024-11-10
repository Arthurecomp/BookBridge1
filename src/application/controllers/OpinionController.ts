import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { OpinionRepository } from "../../domain/repositories/OpinionRepository";
import { CreateOpinion } from "../useCases/Opinion/CreateOpinion";
import authMiddleware from "../middlewares/authMiddleware";

export class OpinionController {
  private createOpinon: CreateOpinion;
  constructor(opinionRepository: OpinionRepository) {
    this.createOpinon = new CreateOpinion(opinionRepository);
  }

  registerRoutes(fastify: FastifyInstance) {
    fastify.post(
      "/opinion",
      { preHandler: authMiddleware },
      this.createOpinionHandler.bind(this)
    ); // criar usuários
  }

  async createOpinionHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { content } = request.body as { content: string }; // Agora o TypeScript sabe que `params` tem um campo `id` do tipo string
      const { rating } = request.body as { rating: number };
      const { userId } = request.body as { userId: string }; // Agora o TypeScript sabe que `params` tem um campo `id` do tipo string
      const { bookId } = request.body as { bookId: number };

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
