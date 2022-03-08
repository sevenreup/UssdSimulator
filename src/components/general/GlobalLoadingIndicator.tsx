import { useIsFetching } from "react-query";
import { LinearProgress, Box } from "@mui/material";

export default function GlobalLoadingIndicator() {
  const isFetching = useIsFetching();

  return (
    <Box sx={{ width: "100%", height: 6, position: "absolute" }}>
      {isFetching > 0 && <LinearProgress sx={{ height: 6 }} />}
    </Box>
  );
}