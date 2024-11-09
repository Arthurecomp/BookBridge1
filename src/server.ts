import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./application/routes/userRoutes";
import { bookClubRoutes } from "./application/routes/bookClubRoutes";

const app: FastifyInstance = fastify();

app.register(userRoutes);
app.register(bookClubRoutes);

const start = async () => {
  try {
    await app.listen({ port: 3100 });
    console.log("Server is running at http://localhost:3100");
  } catch (err) {
    app.log.error(err);
  }
};

start();
