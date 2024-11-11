import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
// import { CreateUser } from "../useCases/Users/CreateUser";
import { UpdateUserName } from "../useCases/Users/UpdateUserName";
import { DeleteUser } from "../useCases/Users/DeleteUser";
import { ListUsers } from "../useCases/Users/ListUsers";
import { UserPrismaRepository } from "../../data/repositories/UserRepositoryPrisma";
import authMiddleware from "../middlewares/authMiddleware";

export class UserController {
  // private createUser: CreateUser;
  private updateUserName: UpdateUserName;
  private deleteUser: DeleteUser;
  private listUser: ListUsers;

  constructor(userRepository: UserPrismaRepository) {
    this.updateUserName = new UpdateUserName(userRepository);
    this.deleteUser = new DeleteUser(userRepository);
    this.listUser = new ListUsers(userRepository);
  }

  registerRoutes(fastify: FastifyInstance) {
    fastify.get(
      "/users",
      { preHandler: authMiddleware },
      this.listUserHandler.bind(this)
    ); // Listar todos os usuários
    fastify.put(
      "/users/:id",
      { preHandler: authMiddleware },
      this.updateUserNameHandler.bind(this)
    ); // Atualizar nome do usuário
    fastify.delete(
      "/users/:id",
      { preHandler: authMiddleware },
      this.deleteUserHandler.bind(this)
    ); // Deletar usuário
  }

  //listar todos os usuários
  async listUserHandler(request: FastifyRequest, reply: FastifyReply) {
    request.log.info("Requsicao da lista de usuarios");
    try {
      const users = await this.listUser.execute();
      request.log.info(`Recebimento de ${users.length} users`);
      reply.status(200).send(users);
    } catch (error) {
      request.log.info(`Erro no recebimento dos usuários: ${error}`);
      reply.status(500).send({ error: "Error retrieving users" });
    }
  }

  //atualizar nome de usuário
  async updateUserNameHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string }; // Agora o TypeScript sabe que `params` tem um campo `id` do tipo string
      const { name } = request.body as { name: string };
      if (!name) {
        return reply.status(400).send({ error: "Name is required" });
      }

      const updatedUser = await this.updateUserName.execute(id, name);
      request.log.info(`Usuário ${id} foi atualizado com sucesso`);
      reply.status(200).send(updatedUser);
    } catch (error) {
      request.log.info(`Usuário não foi atualizado: ${error}`);
      reply.status(500).send({ error: "Error updating user" });
    }
  }

  //deletar usuário
  async deleteUserHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      await this.deleteUser.execute(id);
      reply.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: error || "USER NOT  FOUND" });
    }
  }
}
