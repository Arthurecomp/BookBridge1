import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authHeader = request.headers["authorization"];
    if (!authHeader) {
      return reply
        .status(401)
        .send({ error: "Authorization token is required" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken: any = jwt.verify(token, "meuSegredo");

    if (!decodedToken || !decodedToken.email) {
      return reply.status(401).send({ error: "Invalid or expired token" });
    }

    (request as any).user = decodedToken;

    return true;
  } catch (error) {
    return reply.status(401).send({ error: "Invalid token" });
  }
};

export default authMiddleware;
