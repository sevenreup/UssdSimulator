import { Box } from "@mui/material";
import SessionTimer from "@/components/phone/timer";
import Phone from "../../components/phone/phone";
import PhoneContent from "../../components/phone/PhoneContent";

export interface ISimulatorProps {
  initMessage: string;
}

export default function Simulator({ initMessage }: ISimulatorProps) {
  return (
    <Box sx={{ display: "grid", justifyContent: "center", height: "100vh" }}>
      <SessionTimer timeout={6000} />
      <Phone>
        <PhoneContent initialText={initMessage} />
      </Phone>
    </Box>
  );
}
