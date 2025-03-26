import { useUserPreferences } from "../../hooks/usePreferences";
import {
  Typography,
  Box,
  Chip,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { SuccessAlert } from "../common/SuccessAlert";

interface OptionsType {
  sourceOptions: string[];
  categoryOptions: string[];
  authorOptions: string[];
}

const Preferences = ({
  sourceOptions,
  categoryOptions,
  authorOptions,
}: OptionsType) => {
  const {
    sources,
    setSources,
    categories,
    setCategories,
    authors,
    setAuthors,
  } = useUserPreferences();

  const toggleSelection = (
    value: string,
    setFunction: React.Dispatch<React.SetStateAction<string[]>>,
    currentValues: string[]
  ) => {
    setFunction(
      currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value]
    );
  };

  const [expanded, setExpanded] = useState<boolean>(false); // Default to expanded
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleChange = (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  const storePersonalizedData = () => {
    localStorage.setItem("newsSources", JSON.stringify(sources));
    localStorage.setItem("newsCategories", JSON.stringify(categories));
    localStorage.setItem("newsAuthors", JSON.stringify(authors));

    setExpanded(false); // Closes the accordion after clicking Save
    setOpenSnackbar(true);
  };

  return (
    <div>
      <Box sx={{ maxWidth: 600, margin: "auto", padding: 1 }}></Box>

      {/* Sources Section */}
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Personalize Preferences</Typography>
        </AccordionSummary>
        <>
          <AccordionSummary>
            <Typography component="span">Sources</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {sourceOptions.map((source: string, index) => (
              <Chip
                key={index}
                label={source}
                onClick={() => toggleSelection(source, setSources, sources)}
                color={sources.includes(source) ? "primary" : "default"}
                sx={{ margin: 0.5, cursor: "pointer" }}
              />
            ))}
          </AccordionDetails>
        </>
        <AccordionSummary>
          <Typography component="span">categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {categoryOptions.map((category: string, index) => (
            <>
              <Chip
                key={index}
                label={category}
                onClick={() =>
                  toggleSelection(category, setCategories, categories)
                }
                color={categories.includes(category) ? "primary" : "default"}
                sx={{ margin: 0.5, cursor: "pointer" }}
              />
            </>
          ))}
        </AccordionDetails>
        <AccordionSummary>
          <Typography component="span">Authors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {authorOptions.map((author: string, index) => (
            <Chip
              key={index}
              label={author}
              onClick={() => toggleSelection(author, setAuthors, authors)}
              color={authors.includes(author) ? "primary" : "default"}
              sx={{ margin: 0.5, cursor: "pointer" }}
            />
          ))}
        </AccordionDetails>

        <AccordionDetails>
          <Button
            variant="contained"
            color="primary"
            sx={{ textAlign: "right" }}
            onClick={storePersonalizedData}
          >
            Apply
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* Snackbar for success message */}
      <SuccessAlert
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
      />
    </div>
  );
};

export default Preferences;
