import { Alert, Snackbar } from "@mui/material";

interface Props {
  openSnackbar: boolean;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SuccessAlert: React.FC<Props> = ({
  openSnackbar,
  setOpenSnackbar,
}) => {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={5000} // Auto-hide after 3 seconds
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={() => setOpenSnackbar(false)}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        Personalized news has been saved! Refresh the page to get new
        personalized news
      </Alert>
    </Snackbar>
  );
};
