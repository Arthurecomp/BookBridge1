import { connect } from "http2";
import { OpinionEntity } from "../../domain/entities/OpinionEntity";
import { OpinionRepository } from "../../domain/repositories/OpinionRepository";
import { prisma } from "../database/prisma-client";

export class OpinionPrismaRepository implements OpinionRepository {
  async create(opinion: OpinionEntity): Promise<OpinionEntity> {
    const createOpinion = await prisma.opinion.create({
      data: {
        content: opinion.content,
        rating: opinion.rating,
        user: {
          connect: {
            id: opinion.userId,
          },
        },
        book: {
          connect: {
            id: opinion.bookId,
          },
        },
      },
    });
    return createOpinion;
  }

  async remove(opinion: OpinionEntity): Promise<OpinionEntity> {
    const deletedOpinion = await prisma.opinion.delete({
      where: {
        id: opinion.id,
      },
    });

    return deletedOpinion;
  }

  async averageRating(bookId: number): Promise<number> {
    const averageRating = await prisma.opinion.aggregate({
      where: {
        bookId: bookId,
      },
      _avg: {
        rating: true,
      },
    });

    return averageRating._avg.rating || 0;
  }
}
