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
  onlyRatedBidder?: boolean;
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
  onlyRatedBidder?: boolean;
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
  onlyRatedBidder?: string;
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
  status?: string;
}
