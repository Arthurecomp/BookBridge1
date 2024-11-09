import { OpinionEntity } from "../entities/OpinionEntity";

export interface OpinionRepository {
  create(opinion: OpinionEntity): Promise<OpinionEntity>;
  remove(opinion: OpinionEntity): Promise<OpinionEntity>;
}
