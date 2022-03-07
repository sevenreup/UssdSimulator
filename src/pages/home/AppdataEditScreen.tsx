import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import GeneralSettings from "../../components/settings/GeneralSettings";
import RequestSettings from "../../components/settings/RequestSettings";
import ResponseSettings from "../../components/settings/ResponseSettings";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
