export interface CreateProductDTO {
  name: string;
  description: string;
  category: string;
  images: string[];
  seller: string;
  startPrice: number;
  stepPrice: number;
  expiredAt: Date;
}
