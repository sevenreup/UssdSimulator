import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useUpdateRequestConfig } from "hooks/settings";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useUssd } from "../../context/UssdContext";
import { TextConstants } from "../../utils/Constants";
import ValueEditor from "./Editor";

const RequestSettings = () => {
  const { requestConfig } = useUssd();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, status, error } = useUpdateRequestConfig();
  const [requestLocation, setRequestLocation] = useState(
    requestConfig.requestLocation
  );
  
  console.log(requestConfig);
  
  const onSave = async (value: string, type: string, extra: any) => {
    console.log({ value, type, extra });
    mutate({
      requestType: type,
      requestSample: value,
      requestLocation: requestLocation,
      ...extra,
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

  return (
    <div>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Request Location</InputLabel>
        <Select
          label="Request Location"
          value={requestLocation}
          onChange={(value) => {
            setRequestLocation(value.target.value as any);
          }}
        >
          <MenuItem value="body">Body</MenuItem>
          <MenuItem value="query">Query</MenuItem>
        </Select>
      </FormControl>
      <ValueEditor
        type={requestConfig.requestType}
        value={requestConfig.requestSample}
        onSave={onSave}
        savedKeys={{
          requestMessageKey: requestConfig.requestMessageKey,
          requestMsisdnKey: requestConfig.requestMsisdnKey,
          requestSessionKey: requestConfig.requestSessionKey,
          requestSessionTypeKey: requestConfig.requestSessionTypeKey,
        }}
      />
    </div>
  );
};

export default RequestSettings;
