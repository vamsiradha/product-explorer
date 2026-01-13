export class CreateCategoryDto {
  navigationId: string;
  parentId?: string;
  title: string;
  slug: string;
  productCount?: number;
}

export class UpdateCategoryDto {
  title?: string;
  slug?: string;
  productCount?: number;
  lastScrapedAt?: Date;
}
