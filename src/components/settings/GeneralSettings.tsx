import { Box, TextField, Button } from "@mui/material";
import { useUssd } from "context/UssdContext";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { TextConstants } from "utils/Constants";

const GeneralSettings = () => {
  const { data, setAppData } = useUssd();
  const { enqueueSnackbar } = useSnackbar();
  const [url, setUrl] = useState(data.url);
  const [sessionID, setSessionID] = useState(data.sessionId);

  const save = async () => {
    try {
      await setAppData?.({
        url,
        sessionId: sessionID,
      });
      enqueueSnackbar("Saved");
    } catch (error) {
      console.log(error);

      enqueueSnackbar(TextConstants.FailedToSave, {
        variant: "error",
      });
    }
  };

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
      <Button variant="contained" onClick={save}>
        Save
      </Button>
    </Box>
  );
};

export default GeneralSettings;
