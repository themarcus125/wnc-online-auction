export interface CreateProductDTO {
  name: string;
  descriptions: string[];
  category: string;
  images: string[];
  seller: string;
  buyPrice?: number;
  startPrice: number;
  stepPrice: number;
  expiredAt: Date;
  currentPrice: number;
}

export interface CreateProductRequestDTO {
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
  expiredIn?: number;
  expiredAt?: Date;
  currentBidder?: string;
  currentPrice?: number;
}

export interface QueryProductDTO {
  mode?: string;
  category?: string;
  limit?: string;
  skip?: string;
}
