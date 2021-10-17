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
  createdAt: Date;
  currentPrice: number;
  isAutoRenew?: boolean;
  allowNoRatingBid?: boolean;
}

export interface TransformedCreateProductRequestDTO {
  name: string;
  descriptions: string[];
  category: string;
  images: string[];
  startPrice: number;
  stepPrice: number;
  buyPrice?: number;
  expiredIn: number;
  isAutoRenew?: boolean;
  allowNoRatingBid?: boolean;
}

export interface RawCreateProductRequestDTO {
  name?: string;
  description?: string;
  category?: string;
  startPrice?: string;
  stepPrice?: string;
  buyPrice?: string;
  expiredIn?: string;
  isAutoRenew?: string;
  allowNoRatingBid?: string;
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
  productName?: string;
  productId?: string;
  categoryId?: string;
  price?: string;
  end?: string;
  notExpired?: string;
  limit?: string;
  skip?: string;
}
