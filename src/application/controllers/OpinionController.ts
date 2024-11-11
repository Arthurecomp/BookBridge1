import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { OpinionRepository } from "../../domain/repositories/OpinionRepository";
import { CreateOpinion } from "../useCases/Opinion/CreateOpinion";
import authMiddleware from "../middlewares/authMiddleware";
import { AverageOpinion } from "../useCases/Opinion/AverageOpinion";

export class OpinionController {
  private createOpinon: CreateOpinion;
  private averageRating: AverageOpinion;
  constructor(opinionRepository: OpinionRepository) {
    this.createOpinon = new CreateOpinion(opinionRepository);
    this.averageRating = new AverageOpinion(opinionRepository);
  }

  registerRoutes(fastify: FastifyInstance) {
    fastify.post(
      "/opinion",
      { preHandler: authMiddleware },
      this.createOpinionHandler.bind(this)
    );
    fastify.get(
      "/opinionAverage/:bookId",
      { preHandler: authMiddleware },
      this.averageRatingHandler.bind(this)
    );
  }

  async averageRatingHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { bookId } = request.params as { bookId: string }; // bookId como string
      const bookIdNumber = Number(bookId); // Convertendo para número

      const opinion = await this.averageRating.execute(bookIdNumber);

      reply.status(201).send(opinion);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ error: "Error creating opinion" });
    }
  }

  async createOpinionHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { content } = request.body as { content: string };
      const { rating } = request.body as { rating: number };
      const { userId } = request.body as { userId: string };
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
      reply.status(400).send({ error: "Error creating opinion" });
    }
  }
}
