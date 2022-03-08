import { Box, TextField, Button } from "@mui/material";
import { useUssd } from "context/UssdContext";
import { useSaveAppData } from "hooks/settings";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useState } from "react";
import { TextConstants } from "utils/Constants";

const GeneralSettings = () => {
  const { data } = useUssd();
  const { enqueueSnackbar } = useSnackbar();
  const [url, setUrl] = useState(data.url);
  const [sessionID, setSessionID] = useState(data.sessionId);
  const { refetch, error, isSuccess } = useSaveAppData({
    url,
    sessionId: sessionID,
  });

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Saved");
    }
  }, [enqueueSnackbar, isSuccess]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(TextConstants.FailedToSave, {
        variant: "error",
      });
    }
  }, [enqueueSnackbar, error]);

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <TextField
          label="USSD Url"
          fullWidth
          margin="normal"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <TextField
          label="Session ID"
          fullWidth
          margin="normal"
          value={sessionID}
          onChange={(e) => setSessionID(e.target.value)}
        />
      </Box>
      <Box height={10} />
      <Button variant="contained" onClick={() => refetch()}>
        Save
      </Button>
    </Box>
  );
};

export default GeneralSettings;
