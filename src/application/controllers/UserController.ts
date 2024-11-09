import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CreateUser } from "../useCases/Users/CreateUser";
import { UpdateUserName } from "../useCases/Users/UpdateUserName";
import { DeleteUser } from "../useCases/Users/DeleteUser";
import { ListUsers } from "../useCases/Users/ListUsers";
import { UserPrismaRepository } from "../../data/repositories/UserRepositoryPrisma";

export class UserController {
  private createUser: CreateUser;
  private updateUserName: UpdateUserName;
  private deleteUser: DeleteUser;
  private listUser: ListUsers;

  constructor(userRepository: UserPrismaRepository) {
    this.createUser = new CreateUser(userRepository);
    this.updateUserName = new UpdateUserName(userRepository);
    this.deleteUser = new DeleteUser(userRepository);
    this.listUser = new ListUsers(userRepository);
  }

  registerRoutes(fastify: FastifyInstance) {
    fastify.post("/users", this.createUserHandler.bind(this)); // criar usuários
    fastify.get("/users", this.listUserHandler.bind(this)); // Listar todos os usuários
    fastify.put("/users/:id", this.updateUserNameHandler.bind(this)); // Atualizar nome do usuário
    fastify.delete("/users/:id", this.deleteUserHandler.bind(this)); // Deletar usuário
  }

  // Handler para criação de usuário
  async createUserHandler(
    request: FastifyRequest<{
      Body: { name: string; email: string; password: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const { name, email, password } = request.body;
      const user = await this.createUser.execute({ name, email, password });
      reply.status(201).send(user);
    } catch (error) {
      console.error(error);
      reply.status(400).send({ error: "Error creating user" });
    }
  }

  //listar todos os usuários
  async listUserHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await this.listUser.execute();
      reply.status(200).send(users);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Error retrieving users" });
    }
  }

  //atualizar nome de usuário
  async updateUserNameHandler(
    request: FastifyRequest<{ Params: { id: string }; Body: { name: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const { name } = request.body;
      if (!name) {
        return reply.status(400).send({ error: "Name is required" });
      }
      const updatedUser = await this.updateUserName.execute(id, name);
      reply.status(200).send(updatedUser);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Error updating user" });
    }
  }

  //deletar usuário
  async deleteUserHandler(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      await this.deleteUser.execute(id);
      reply.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: error || "USER NOT  FOUND" });
    }
  }
}
