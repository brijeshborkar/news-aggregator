import { useState, useCallback, ChangeEvent, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import Preferences from "./article/Preferences";
import { useUserPreferences } from "../hooks/usePreferences";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Skeletons } from "./common/Skeleton";
import { useFetchNews } from "../hooks/useFetchNews";
import { NewsArticle } from "../types/newsArticle";
import { useFilterOptions } from "../hooks/useFilters";
import { NoResults } from "./common/NoResults";
import { AllNews } from "./article/AllNews";
import { PersonalizedNews } from "./article/PersonalizedNews";
import { ArticleFilters } from "./article/Filters";
import {
  filterNewsByPreferences,
  getUniqueValues,
  getValidValues,
} from "../utils/articleFiltering";
import { Category } from "@mui/icons-material";

const NewsAggregator: React.FC = () => {
  const { news, isLoading, error, setIsReset, isReset } = useFetchNews(); // fetches and displays news
  let { sources, categories, authors } = useUserPreferences(); // selects preferences
  const { sourceOptions, categoryOptions, authorOptions } =
    useFilterOptions(news);

  // Filters
  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  // Personalized preferences state
  const [selectedSource, setSelectedSource] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Customizing personalized news

  const availableCategories = getUniqueValues(news, "category");

  const availableAuthors = getUniqueValues(news, "author");

  // Remove outdated categories and authors from preferences
  const validCategories = getValidValues(categories, availableCategories);

  const validAuthors = getValidValues(authors, availableAuthors);

  const personalizedNews = filterNewsByPreferences(
    news,
    sources,
    validCategories as string[],
    validAuthors as string[]
  );

  // Extract available sources, categories, and authors from API response

  // Apply Filters
  const filteredNews = news.filter((article: NewsArticle) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesSource =
      selectedSource === "All" || article.source === selectedSource;
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    const matchesDate =
      selectedDate === "" || article.publishedAt.startsWith(selectedDate); // Matches YYYY-MM-DD

    return matchesSearch && matchesSource && matchesCategory && matchesDate;
  });

  // Debounced search function using useCallback
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 300), // 300ms delay
    []
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleResetFilters = () => {
    setSelectedSource("All");
    setSelectedCategory("All");
    setSelectedDate("");
    setSearch("");
    setSearchInput("");

    //fetch news from the API
    setIsReset(!isReset);
  };

  return (
    <div>
      <Preferences
        sourceOptions={sourceOptions}
        categoryOptions={categoryOptions}
        authorOptions={authorOptions}
      />
      <br />

      {/* News List */}
      <Grid container spacing={2}>
        {isLoading ? (
          Array.from(new Array(10)).map((_, index) => (
            <Skeletons key={index} index={index} />
          ))
        ) : (
          <>
            {/* Section for Personalized News */}
            {personalizedNews.length === 0 ? (
              <Typography
                variant="h6"
                sx={{ color: "gray", marginTop: "1rem" }}
              >
                📰 No personalized news available. <br />
                Try updating your <strong>preferences</strong> to see customized
                articles!
              </Typography>
            ) : (
              <PersonalizedNews personalizedNews={personalizedNews} />
            )}

            <ArticleFilters
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedSource={selectedSource}
              setSelectedSource={setSelectedSource}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sourceOptions={sourceOptions}
              categoryOptions={categoryOptions}
            />

            <TextField
              label="Search articles..."
              variant="standard"
              fullWidth
              value={searchInput}
              onChange={handleSearchChange}
              sx={{ margin: "1rem 0 2rem 0" }}
            />

            {/* Section for All News */}
            {filteredNews.length > 0 && (
              <>
                <Typography
                  variant="h5"
                  display={"block"}
                  sx={{
                    background: "black",
                    color: "white",
                    marginBottom: "1rem",
                    padding: "5px 10px",
                    borderRadius: "10px",
                    width: "100%",
                  }}
                >
                  All News
                </Typography>
                <Grid container spacing={2}>
                  {filteredNews.map((article, index) => (
                    <AllNews
                      key={`filtered-${index}`}
                      article={article}
                      index={index}
                      title="All News"
                    />
                  ))}
                </Grid>
              </>
            )}
          </>
        )}
        {/* dislay no news UI */}
      </Grid>
      {filteredNews.length === 0 && !isLoading && (
        <NoResults resetFilters={handleResetFilters} />
      )}
    </div>
  );
};

export default NewsAggregator;
