import { useEffect, useState } from "react";
import { NewsArticle } from "../types/newsArticle";

const getSourceOptions = (news: NewsArticle[]) => {
  return [...new Set(news.map((article: NewsArticle) => article.source))];
};
const getCategoryOptions = (news: NewsArticle[]) => {
  return [
    ...new Set(news.map((article: NewsArticle) => article.category)),
  ].filter((name) => name);
};

const getAuthorOptions = (news: NewsArticle[]) => {
  return [
    ...new Set(news.map((article: NewsArticle) => article.author)),
  ].filter((name) => name);
};

export const useFilterOptions = (news: NewsArticle[]) => {
  const [sourceOptions, setSourceOptions] = useState<string[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [authorOptions, setAuthorOptions] = useState<string[]>([]);

  useEffect(() => {
    if (news) {
      // checking if the news article has received the data
      setSourceOptions(getSourceOptions(news));
      setCategoryOptions(getCategoryOptions(news) as string[]);
      setAuthorOptions(getAuthorOptions(news) as string[]);
    }
  }, [news]);
  return { sourceOptions, categoryOptions, authorOptions };
};
