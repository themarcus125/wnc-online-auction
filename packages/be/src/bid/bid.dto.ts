export interface CreateBidDTO {
  product: string;
  bidder: string;
  price: number;
  maxAutoPrice?: number;
}
