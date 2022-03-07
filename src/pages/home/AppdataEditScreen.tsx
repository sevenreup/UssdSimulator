import { Box, Tabs, Tab, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import ValueEditor from "../../components/settings/Editor";
import { useUssd } from "../../context/UssdContext";

export interface IAppdataEditScreenProps {}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const GeneralSettings = () => {
  const { data } = useUssd();

  const [url, setUrl] = useState(data.url);
  const [sessionID, setSessionID] = useState(data.sessionId);

  const save = () => {};
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

const RequestSettings = () => {
  const { data, setAppData } = useUssd();
  const onSave = async (value: string, type: string, extra: any) => {
    console.log({ value, type, extra });
    try {
      await setAppData?.({
        requestType: type,
        requestSample: value,
        ...extra,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <ValueEditor
        type={data.requestType}
        value={data.requestSample}
        onSave={onSave}
        savedKeys={{
          requestMessageKey: data.requestMessageKey,
          requestMsisdnKey: data.requestMsisdnKey,
          requestSessionKey: data.requestSessionKey,
          requestSessionTypeKey: data.requestSessionTypeKey,
        }}
      />
    </div>
  );
};

const ResponseSettings = () => {
  const { data, setAppData } = useUssd();
  const onSave = (value: string, type: string, extra: any) => {
    console.log({ value, type, extra });
    try {
      setAppData?.({
        responseType: type,
        responseSample: value,
        ...extra,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ValueEditor
        type={data.responseType}
        value={data.responseSample}
        onSave={onSave}
        savedKeys={{ responseMessageKey: data.responseMessageKey }}
      />
    </div>
  );
};

export default function AppdataEditScreen(props: IAppdataEditScreenProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Request" {...a11yProps(1)} />
          <Tab label="Response" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <GeneralSettings />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RequestSettings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ResponseSettings />
      </TabPanel>
    </Box>
  );
}
