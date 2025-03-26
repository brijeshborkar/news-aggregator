import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface Props {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedSource: string;
  setSelectedSource: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  sourceOptions: string[];
  categoryOptions: string[];
}

export const ArticleFilters: React.FC<Props> = (props) => {
  const {
    selectedDate,
    setSelectedDate,
    selectedSource,
    setSelectedSource,
    setSelectedCategory,
    selectedCategory,
    sourceOptions,
    categoryOptions,
  } = props;
  return (
    <Paper elevation={1} sx={{ padding: "2rem", width: "100%" }}>
      <Typography variant="h5">Filters</Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 6, sm: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate ? dayjs(selectedDate) : null}
              onChange={(newDate) =>
                setSelectedDate(newDate ? newDate.format("YYYY-MM-DD") : "")
              }
              slotProps={{
                textField: { variant: "standard", fullWidth: true },
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid size={{ xs: 6, sm: 4 }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Sources</InputLabel>
            <Select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
            >
              <MenuItem value="All">All Sources</MenuItem>
              {sourceOptions.map((source: string, index: number) => (
                <MenuItem key={index} value={source}>
                  {source}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 6, sm: 4 }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Categories</InputLabel>
            <Select
              size="medium"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="All">All Categories</MenuItem>
              {categoryOptions.map((category: string, index: number) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};
