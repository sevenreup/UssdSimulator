import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import SimulatorPage from "./pages/simulator";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="simulator" element={<SimulatorPage />} />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
