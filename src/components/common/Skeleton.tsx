import { Card, CardContent, Skeleton } from "@mui/material";
import { Grid } from "@mui/system";

export const Skeletons: React.FC<{ index: number }> = ({ index }) => {
  return (
    <Grid size={{ xs: 12, md: 4, sm: 6 }} key={index}>
      <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
        <Skeleton variant="rectangular" width="100%" height={180} />
        <CardContent>
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="100%" height={20} />
        </CardContent>
      </Card>
    </Grid>
  );
};
