import { NewsArticle } from "../types/newsArticle";

export const getUniqueValues = <K extends keyof NewsArticle>(
  news: NewsArticle[],
  key: K
) => {
  return new Set(news.map((article) => article[key]));
};

export const getValidValues = <T>(
  selectedValues: T[],
  availableValues: Set<T>
) => {
  return selectedValues.filter((value) => availableValues.has(value));
};

export const filterNewsByPreferences = (
  news: NewsArticle[],
  sources: string[],
  validCategories: string[],
  validAuthors: string[]
): NewsArticle[] => {
  const isFilterActive = (arr: string[]) => arr.length > 0;

  const hasFiltersApplied =
    isFilterActive(sources) ||
    isFilterActive(validCategories) ||
    isFilterActive(validAuthors);

  if (!hasFiltersApplied) return [];

  return news.filter((article) => {
    const sourcesPreferences =
      !isFilterActive(sources) || sources.includes(article.source);
    const categoriesPreferences =
      !isFilterActive(validCategories) ||
      validCategories.includes(article.category as string);
    const authorsPreferences =
      !isFilterActive(validAuthors) ||
      validAuthors.includes(article.author as string);

    return sourcesPreferences && categoriesPreferences && authorsPreferences;
  });
};
