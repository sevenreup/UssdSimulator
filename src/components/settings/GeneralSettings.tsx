import { Box, TextField, Button } from "@mui/material";
import { useUssd } from "context/UssdContext";
import { useUpdateGeneralConfigConfig } from "hooks/settings";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useState } from "react";
import { TextConstants } from "utils/Constants";

const GeneralSettings = () => {
  const { generalConfig } = useUssd();
  const { mutate, status, error } = useUpdateGeneralConfigConfig();
  const { enqueueSnackbar } = useSnackbar();
  const [url, setUrl] = useState(generalConfig.url);
  const [sessionId, setSessionId] = useState(generalConfig.sessionId);
  const [msisdn, setMsisdn] = useState(generalConfig.msisdn);

  const save = () => {
    mutate({
      url,
      sessionId,
      msisdn,
    });
  };

  useEffect(() => {
    if (status === "success") {
      enqueueSnackbar("saved");
    } else if (status === "error") {
      console.log(error);
      enqueueSnackbar(TextConstants.FailedToSave, {
        variant: "error",
      });
    }
  }, [status, error, enqueueSnackbar]);

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
          label="Msisdn"
          fullWidth
          margin="normal"
          value={msisdn}
          onChange={(e) => setMsisdn(e.target.value)}
        />
        <TextField
          label="Session ID"
          fullWidth
          margin="normal"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
        />
      </Box>
      <Box height={10} />
      <Button variant="contained" onClick={() => save()}>
        Save
      </Button>
    </Box>
  );
};

export default GeneralSettings;
