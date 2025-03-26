import { useEffect, useState } from "react";
import { NewsArticle } from "../types/newsArticle";
import { normalizeNews } from "../utils/normalizeNews";
import { NewsApi } from "../api/newsApi";

export const useFetchNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [newsapi, guardian, nyt] = await Promise.all([
          NewsApi.getNews(),
          NewsApi.getGuardian(),
          NewsApi.getNewyorkTimes(),
        ]);

        const mergedNews = [
          ...normalizeNews("newsapi", newsapi.data),
          ...normalizeNews("guardian", guardian.data),
          ...normalizeNews("nyt", nyt.data),
        ].sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );

        setNews(mergedNews);
      } catch (err) {
        setError("Failed to load news");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [isReset]);

  return { news, isLoading, setIsReset, error, isReset };
};
