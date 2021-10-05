export interface CreateProductDTO {
  name: string;
  descriptions: string[];
  category: string;
  images: string[];
  seller: string;
  buyPrice?: number;
  startPrice: number;
  stepPrice: number;
  expiredIn: number;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  category?: string;
  images?: string[];
  seller?: string;
  buyPrice?: number;
  startPrice?: number;
  stepPrice?: number;
  expiredIn: number;
  currentBidder?: string;
  currentPrice?: number;
}
