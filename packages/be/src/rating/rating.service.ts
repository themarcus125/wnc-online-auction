import RepositoryService from '@/db/repository.service';
import { CreateRatingDTO } from './rating.dto';
import { RatingDoc, RatingModel } from './rating.schema';

class RatingService extends RepositoryService<RatingDoc, CreateRatingDTO> {
  constructor() {
    super(RatingModel);
  }

  async countScore(id: string): Promise<[number, number, number]> {
    const ratings = await this.find({
      targetUser: id,
    });
    let total = 0;
    let pos = 0;
    let neg = 0;
    for (const r of ratings) {
      total += 1;
      if (r.score === true) pos += 1;
      if (r.score === false) neg += 1;
    }
    return [total, pos, neg];
  }
}

export default new RatingService();
