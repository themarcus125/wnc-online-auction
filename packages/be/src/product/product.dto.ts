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
  currentPrice?: number;
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

export interface QueryProductDTO {
  mode?: string;
  category?: string;
  limit?: string;
  skip?: string;
}
