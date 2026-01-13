export class CreateNavigationDto {
  title: string;
  slug: string;
}

export class UpdateNavigationDto {
  title?: string;
  slug?: string;
  lastScrapedAt?: Date;
}
