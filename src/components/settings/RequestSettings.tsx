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
  const [extra, setExtrs] = useState({
    requestLocation: requestConfig.requestLocation,
    requestMethod: requestConfig.requestMethod,
  });

  const onSave = async (value: string, type: string, extraValues: any) => {
    console.log({ value, type, extra, extraValues });
    mutate({
      requestType: type,
      requestSample: value,
      ...extra,
      ...extraValues,
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
          value={extra.requestLocation}
          onChange={(value) => {
            setExtrs({
              ...extra,
              requestLocation: value.target.value as any,
            });
          }}
        >
          <MenuItem value="body">Body</MenuItem>
          <MenuItem value="query">Query</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Request Method</InputLabel>
        <Select
          label="Request Location"
          value={extra.requestMethod}
          onChange={(value) => {
            setExtrs({
              ...extra,
              requestMethod: value.target.value as any,
            });
          }}
        >
          <MenuItem value="POST">Post</MenuItem>
          <MenuItem value="GET">Get</MenuItem>
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
