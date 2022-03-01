import { useSearchParams } from "react-router-dom";
import Simulator from "./Simulator";

export default function SimulatorPage() {
  const [searchParams] = useSearchParams();
  let message = searchParams.get("message");
  return <Simulator initMessage={message ?? ""} />;
}
