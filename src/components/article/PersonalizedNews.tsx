import { Box, Grid } from "@mui/system";
import { NewsArticle } from "../../types/newsArticle";
import { useRef } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Expandedtext } from "../common/Expandedtext";

interface Props {
  personalizedNews: NewsArticle[];
}

export const PersonalizedNews: React.FC<Props> = ({ personalizedNews }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Function to scroll the container
  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      {personalizedNews.length > 0 && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            py: 2,
            marginBottom: "1rem",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              background: "black",
              color: "white",
              marginBottom: "1rem",
              padding: "5px 10px",
              borderRadius: "10px",
            }}
          >
            Personalized News
          </Typography>

          {/* Scrollable News Container */}
          <Box
            ref={scrollContainerRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              gap: 2,
              px: 0, // Padding inside scroll area
              paddingBottom: "10px",
            }}
          >
            {personalizedNews.map((article, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: 300, // Set card width for proper spacing
                  maxWidth: 350,
                  minHeight: 350, // Ensures all cards start with the same height
                  display: "flex",
                  flexDirection: "column",
                  transition: "min-height 0.3s ease",
                  height: 350,
                  position: "relative",
                }}
              >
                <CardMedia
                  sx={{ height: 140, flexShrink: 0 }}
                  image={article.imageUrl}
                  title={article.title}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    backgroundColor: "#fff",
                  }}
                >
                  {article.source}
                </Typography>
                <CardContent sx={{ flexGrow: 1, overflow: "auto" }}>
                  <Typography gutterBottom variant="h6">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Expandedtext article={article} index={index} />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href={article.url} target="_blank" size="small">
                    Read More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
          {/* Left Scroll Button */}
          {personalizedNews.length > 2 && (
            <>
              <IconButton
                onClick={() => scroll(-300)}
                sx={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255, 255, 255, 0.8)",
                  boxShadow: 2,
                  zIndex: 2,
                }}
              >
                <ChevronLeft />
              </IconButton>

              {/* Right Scroll Button */}
              <IconButton
                onClick={() => scroll(300)}
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255, 255, 255, 0.8)",
                  boxShadow: 2,
                  zIndex: 2,
                }}
              >
                <ChevronRight />
              </IconButton>
            </>
          )}
        </Box>
      )}
    </>
  );
};
