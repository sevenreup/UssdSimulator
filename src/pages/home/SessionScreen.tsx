import { Box, Button, CardContent, Container, Typography } from "@mui/material";
import { TextConstants } from "utils/Constants";
import { useUssd } from "../../context/UssdContext";
import { useSnackbar } from "notistack";
import { useInitUssdCall } from "api";
import { useEffect } from "react";

export interface ISessionScreenProps {
  onMessageReceived: (text: string) => void;
}

export default function SessionScreen({
  onMessageReceived,
}: ISessionScreenProps) {
  const session = useUssd();
  const { enqueueSnackbar } = useSnackbar();
  const { error, data, isSuccess, refetch } = useInitUssdCall(session.data);

  useEffect(() => {
    console.log(data);

    if (isSuccess && data !== undefined) {
      onMessageReceived(data!.response);
    }
  }, [isSuccess, data, onMessageReceived]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(TextConstants.FailedToStartSession, {
        variant: "error",
      });
    }
  }, [enqueueSnackbar, error]);

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
          <Button
            onClick={() => {
              refetch();
            }}
            variant="contained"
            fullWidth
          >
            Start
          </Button>
        </Box>
      </CardContent>
    </Container>
  );
}
