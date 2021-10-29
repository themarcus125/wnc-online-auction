export interface CreateRatingDTO {
  createUser: string;
  targetUser: string;
  product: string;
  feedback: string;
  score: boolean;
}
