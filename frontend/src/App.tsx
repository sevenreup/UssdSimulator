import { createRef } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import SimulatorPage from "./pages/simulator";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { Button } from "@mui/material";
import GlobalLoadingIndicator from "@/components/general/GlobalLoadingIndicator";

function App() {
  const notistackRef = createRef<SnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef?.current?.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      maxSnack={3}
      ref={notistackRef}
      action={(key) => <Button onClick={onClickDismiss(key)}>'Dismiss'</Button>}
    >
      <GlobalLoadingIndicator />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="simulator" element={<SimulatorPage />} />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
