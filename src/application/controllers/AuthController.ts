import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { Login } from "../useCases/Auth/Login";
import { AuthRepositoryPrisma } from "../../data/repositories/AuthRepositoryPrisma";
import { CreateUser } from "../useCases/Auth/Create";

export class AuthController {
  private loginUseCase: Login;
  private createUser: CreateUser;

  constructor(authRepository: AuthRepositoryPrisma) {
    this.loginUseCase = new Login(authRepository);
    this.createUser = new CreateUser(authRepository);
  }

  registerRoutes(fastify: FastifyInstance) {
    fastify.post("/login", this.loginHandler.bind(this));
    fastify.post("/registerUser", this.createUserHandler.bind(this));
  }

  async loginHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };
      const token = await this.loginUseCase.execute(email, password);
      request.log.info(`Login do ${email} realizado com sucesso`);
      return reply.send({ token });
    } catch (error) {
      if (error === "User not found") {
        return reply.status(404).send({ error: "User not found" });
      }
      if (error === "Wrong password") {
        return reply.status(401).send({ error: "Wrong password" });
      }
      request.log.info(`Login nao realizado`);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async createUserHandler(
    request: FastifyRequest<{
      Body: { name: string; email: string; password: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const { name, email, password } = request.body;
      const user = await this.createUser.execute({ name, email, password });
      request.log.info(`Criado com sucesso: ${name}, ${email}`);
      reply.status(201).send(user);
    } catch (error) {
      console.error(error);
      request.log.info(`Usuario nao criado: ${error}`);
      reply.status(400).send({ error: "Error creating user" });
    }
  }
}
