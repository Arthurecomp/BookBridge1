import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/AuthController";
import { AuthRepositoryPrisma } from "../../data/repositories/AuthRepositoryPrisma";

export function authRoutes(fastify: FastifyInstance) {
  const loginRepository = new AuthRepositoryPrisma();
  const login = new AuthController(loginRepository);

  login.registerRoutes(fastify);
}
