import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import SimulatorPage from "./pages/simulator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="simulator" element={<SimulatorPage />} />
    </Routes>
  );
}

export default App;
