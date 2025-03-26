import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff"; // A relevant MUI icon

export const NoResults = ({ resetFilters }: { resetFilters: () => void }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        textAlign: "center",
      }}
    >
      <SearchOffIcon sx={{ fontSize: 80, color: "gray" }} />
      <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
        No News Found
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mt: 1 }}>
        Try adjusting your filters or selecting different sources.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={resetFilters}
      >
        Reset Filters
      </Button>
    </Box>
  );
};
