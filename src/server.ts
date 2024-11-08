import fastify, { FastifyInstance } from "fastify";

const app: FastifyInstance = fastify();

app.listen(
  {
    port: 3100,
  },
  () => console.log("Server is run")
);
