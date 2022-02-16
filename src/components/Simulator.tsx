import { Box } from "@mui/material";
import Phone from "./phone";
import PhoneContent from "./PhoneContent";

export interface ISimulatorProps {
  initMessage: string;
}

export default function Simulator({ initMessage }: ISimulatorProps) {
  return (
    <Box sx={{ display: "grid", justifyContent: "center", height: "100vh" }}>
      <Phone>
        <PhoneContent initialText={initMessage} />
      </Phone>
    </Box>
  );
}
