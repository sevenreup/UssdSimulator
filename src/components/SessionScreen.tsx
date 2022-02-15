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
import { useUssd } from "../context/UssdContext";

export interface ISessionScreenProps {}

export default function SessionScreen(props: ISessionScreenProps) {
  const session = useUssd();
  const [url, setUrl] = useState("https://localhost:44356/Game/Ussd");

  const onStart = () => {
    session.setSession({ ...session, started: true, url: url });
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
