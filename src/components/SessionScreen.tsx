import {
  Box,
  Button,
  Card,
  CardActions,
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
  const [url, setUrl] = useState(session.url);

  const onStart = async () => {
    try {
      const data = await callUssd(url, {
        Msisdn: session.msisdn,
        SessionId: session.sessionId,
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
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Angle Dimensions USSD simulator
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
        </CardContent>
        <CardActions>
          <Button onClick={onStart}>Start</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
