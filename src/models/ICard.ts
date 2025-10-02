export interface ICard {
  Id: number;
  Title: string;
  Thumbnail: string; // URL string
  Description: string;
  Metadata: string;
  PublishedBy?: string;
}
