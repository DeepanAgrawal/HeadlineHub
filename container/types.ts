export interface Source {
  id: string | null;
  name: string | null;
}

export interface Article {
  source: Source;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  id: number | null;
  isDisplayed: boolean | null;
  isPinned: boolean | null;
}
