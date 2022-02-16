import { Box } from "@mui/material";
import Phone from "./phone";
import PhoneContent from "./PhoneContent";

export interface ISimulatorProps {
  initMessage: string;
}

export default function Simulator({ initMessage }: ISimulatorProps) {
  return (
    <div>
      <Box sx={{ padding: 1, display: "flex", justifyContent: "center" }}>
        <img src="/logo.png" alt="Ad Logo" width={120} />
      </Box>
      <Phone>
        <PhoneContent initialText={initMessage} />
      </Phone>
    </div>
  );
}
