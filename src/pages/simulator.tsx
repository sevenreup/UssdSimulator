import { useSearchParams } from "react-router-dom";
import Simulator from "../components/Simulator";

export default function SimulatorPage() {
  const [searchParams] = useSearchParams();
  let message = searchParams.get("message");
  return <Simulator initMessage={message ?? ""} />;
}
