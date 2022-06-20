import { Box, Button, CardContent, Container, Typography } from "@mui/material";
import { TextConstants } from "@/utils/Constants";
import { useSnackbar } from "notistack";
import { useInitUssdCall } from "@/api";
import { useEffect } from "react";

export interface ISessionScreenProps {
  onMessageReceived: (text: string) => void;
}

export default function SessionScreen({
  onMessageReceived,
}: ISessionScreenProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { error, data, status, refetch } = useInitUssdCall();

  useEffect(() => {
    console.log({data, status});

    if (status === "success") {
      onMessageReceived(data!.response);
    }
  }, [data, onMessageReceived, status]);

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
          <img src="src/assets/images/logo192.png" alt="Logo" width={120} />
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
