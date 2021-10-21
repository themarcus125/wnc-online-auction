import RepositoryService from '@/db/repository.service';
import { CreateRatingDTO } from './rating.dto';
import { RatingDoc, RatingModel } from './rating.schema';

class RatingService extends RepositoryService<RatingDoc, CreateRatingDTO> {
  constructor() {
    super(RatingModel);
  }
}

export default new RatingService();
