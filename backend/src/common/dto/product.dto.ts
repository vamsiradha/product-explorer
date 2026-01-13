export class CreateProductDto {
  sourceId: string;
  categoryId: string;
  title: string;
  price?: number;
  currency?: string;
  imageUrl?: string;
  sourceUrl: string;
}

export class UpdateProductDto {
  title?: string;
  price?: number;
  imageUrl?: string;
  lastScrapedAt?: Date;
}
