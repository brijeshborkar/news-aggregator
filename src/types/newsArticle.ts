export interface NewsArticle {
    title: string;
    description: string;
    url: string;
    imageUrl: string;
    source: string;
    publishedAt: string;
    category?: string; // Optional, since not all APIs provide this
    author?: string; // Optional
  }

  export enum AGGREGATOR_TYPES {
    NEWS_API="newsapi",
    GUARDIAN="guardian",
    NYT="nyt"
  }