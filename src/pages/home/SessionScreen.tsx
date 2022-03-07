import { Box, Button, CardContent, Container, Typography } from "@mui/material";
import { callUssd } from "../../api/api";
import { useUssd } from "../../context/UssdContext";
import { SessionTypes } from "../../model/UssdRequest";

export interface ISessionScreenProps {
  onMessageReceived: (text: string) => void;
}

export default function SessionScreen({
  onMessageReceived,
}: ISessionScreenProps) {
  const session = useUssd();

  const onStart = async () => {
    try {
      const data = await callUssd(session.data.url, {
        Msisdn: session.data.msisdn,
        SessionId: session.data.sessionId,
        Message: "1",
        SessionType: SessionTypes.NewRequest,
      });
      onMessageReceived(data.response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <CardContent>
        <Box sx={{ padding: 4, display: "flex", justifyContent: "center" }}>
          <img src="/logo.png" alt="Ad Logo" width={120} />
        </Box>
        <Typography variant="h5" component="div" textAlign="center">
          USSD simulator
        </Typography>

        <Box marginTop={2}>
          <Button onClick={onStart} variant="contained" fullWidth>
            Start
          </Button>
        </Box>
      </CardContent>
    </Container>
  );
}
