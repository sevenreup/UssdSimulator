import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { callUssd } from "../api/api";
import { useUssd } from "../context/UssdContext";
import { SessionTypes } from "../model/UssdRequest";

export interface ISessionScreenProps {
  onMessageReceived: (text: string, url: string) => void;
}

export default function SessionScreen({
  onMessageReceived,
}: ISessionScreenProps) {
  const session = useUssd();
  const [url, setUrl] = useState(session.data.url);

  const onStart = async () => {
    try {
      const data = await callUssd(url, {
        Msisdn: session.data.msisdn,
        SessionId: session.data.sessionId,
        Message: "1",
        SessionType: SessionTypes.NewRequest,
      });
      onMessageReceived(data.response, url);
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
      <Card sx={{ minWidth: "60%" }}>
        <CardContent>
          <Box sx={{ padding: 4, display: "flex", justifyContent: "center" }}>
            <img src="/logo.png" alt="Ad Logo" width={120} />
          </Box>
          <Typography variant="h5" component="div" textAlign="center">
            USSD simulator
          </Typography>
          <Box sx={{ marginTop: 4 }}>
            <TextField
              fullWidth
              label="Ussd Url"
              variant="outlined"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </Box>
          <Box marginTop={2}>
            <Button onClick={onStart} variant="contained" fullWidth>
              Start
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
