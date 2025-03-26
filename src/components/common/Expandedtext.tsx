import { useState } from "react";
import { NewsArticle } from "../../types/newsArticle";
import { Button } from "@mui/material";

interface ExpandedType {
  [key: number]: boolean;
}

export const Expandedtext = ({
  article,
  index,
}: {
  article: NewsArticle;
  index: number;
}) => {
  const [expanded, setExpanded] = useState<ExpandedType>({});

  const truncateText = (
    text: string,
    limit: number,
    index: number,
    expanded: ExpandedType
  ) => {
    text = text ?? "";
    const words = text.split(" ");
    if (words.length > limit && !expanded[index]) {
      return words.slice(0, limit).join(" ") + "... ";
    }
    return text;
  };
  return (
    <>
      {truncateText(article.description, 20, index, expanded)}
      {article.description &&
      !expanded[index] &&
      article.description.split(" ").length > 20 ? (
        <Button
          sx={{
            textTransform: "none",
            padding: 0,
            minWidth: "auto",
            fontSize: "0.85rem",
          }}
          onClick={() =>
            setExpanded({
              ...expanded,
              [index]: expanded[index] || true,
            })
          }
        >
          show more
        </Button>
      ) : (
        expanded[index] && (
          <Button
            size="small"
            sx={{
              textTransform: "none",
              padding: 0,
              minWidth: "auto",
              fontSize: "0.85rem",
            }}
            onClick={() => setExpanded({ ...expanded, [index]: false })}
          >
            Show Less
          </Button>
        )
      )}
    </>
  );
};
