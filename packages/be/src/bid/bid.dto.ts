export interface CreateBidDTO {
  product: string;
  bidder: string;
  price: number;
  maxAutoPrice?: number;
}

export interface QueryBidDTO {
  product?: string;
  bidder?: string;
}
