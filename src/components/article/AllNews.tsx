import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { NewsArticle } from "../../types/newsArticle";
import { Expandedtext } from "../common/Expandedtext";

export const AllNews: React.FC<{
  index: number;
  article: NewsArticle;
  title: string;
}> = ({ index, article, title }) => {
  return (
    <Grid key={index} size={{ xs: 12, md: 4, sm: 6 }}>
      <Card
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minHeight: 350,
          transition: "min-height 0.3s ease",
          height: 350,
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
          <Typography gutterBottom variant="h6" component="div">
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
    </Grid>
  );
};
