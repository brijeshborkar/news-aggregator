import { NewsArticle, AGGREGATOR_TYPES } from "../types/newsArticle";

export const normalizeNews = (api: string, data: any): NewsArticle[] => {
  switch (api) {
    case AGGREGATOR_TYPES.NEWS_API:
      return data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        imageUrl: article.urlToImage || "",
        // source: article.source.name,
        source: "NewsAPI",
        publishedAt: article.publishedAt,
        author: article.author || "Unknown",
      }));

    case AGGREGATOR_TYPES.GUARDIAN:
      return data.response.results.map((article: any) => ({
        title: article.webTitle,
        description: "",
        url: article.webUrl,
        imageUrl: article.fields?.thumbnail || "",
        source: "The Guardian",
        publishedAt: article.webPublicationDate,
        category: article.sectionName,
        author: "Unknown",
      }));

    case AGGREGATOR_TYPES.NYT:
      return data.results.map((article: any) => ({
        title: article.title,
        description: article.abstract,
        url: article.url,
        imageUrl: article.multimedia?.[0]?.url || "",
        source: "NY Times",
        publishedAt: article.published_date,
        author: article.byline || "Unknown",
      }));

    default:
      return [];
  }
};
