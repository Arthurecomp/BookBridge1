import { FastifyInstance } from "fastify";
import { OpinionPrismaRepository } from "../../data/repositories/OpinionPrismaRespository";
import { OpinionController } from "../controllers/OpinionController";

export function opinionRoutes(fastify: FastifyInstance) {
  const opinionRepository = new OpinionPrismaRepository();
  const opinionController = new OpinionController(opinionRepository);

  opinionController.registerRoutes(fastify);
}
