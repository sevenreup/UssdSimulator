import { createRef } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import SimulatorPage from "./pages/simulator";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { Button } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalLoadingIndicator from "components/general/GlobalLoadingIndicator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchInterval: false,
      cacheTime: 0,
    },
  },
});

function App() {
  const notistackRef = createRef<SnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef?.current?.closeSnackbar(key);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={3}
        ref={notistackRef}
        action={(key) => (
          <Button onClick={onClickDismiss(key)}>'Dismiss'</Button>
        )}
      >
        <GlobalLoadingIndicator />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="simulator" element={<SimulatorPage />} />
        </Routes>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
