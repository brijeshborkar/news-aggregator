import { useState } from "react";

export const useUserPreferences = () => {
  // Load preferences from localStorage on mount

  const [sources, setSources] = useState<string[]>(() => {
    const saved = localStorage.getItem("newsSources");
    return saved ? JSON.parse(saved) : []; // Default empty if nothing is saved
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem("newsCategories");
    return saved ? JSON.parse(saved) : [];
  });

  let [authors, setAuthors] = useState<string[]>(() => {
    const saved = localStorage.getItem("newsAuthors");
    return saved ? JSON.parse(saved) : [];
  });

  return {
    sources,
    setSources,
    categories,
    setCategories,
    authors,
    setAuthors,
  };
};
