import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./application/routes/userRoutes";
import { bookClubRoutes } from "./application/routes/bookClubRoutes";
import { bookRoutes } from "./application/routes/bookRoutes";
import { opinionRoutes } from "./application/routes/opinionRoutes";
import { authRoutes } from "./application/routes/authRoutes";

const app: FastifyInstance = fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        destination: "./logs/combined.log",
      },
    },
  },
});

app.register(userRoutes);
app.register(bookClubRoutes);
app.register(bookRoutes);
app.register(opinionRoutes);
app.register(authRoutes);

const start = async () => {
  try {
    await app.listen({ port: 3100 });
    console.log("Server is running at http://localhost:3100");
  } catch (err) {
    app.log.error(err);
  }
};

start();
