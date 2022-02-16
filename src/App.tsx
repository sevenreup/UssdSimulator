import { useState } from "react";
import SessionScreen from "./components/SessionScreen";
import Simulator from "./components/Simulator";
import { useUssd } from "./context/UssdContext";

function App() {
  const session = useUssd();
  const [initMessage, setInitMessage] = useState("Please make a request");
  return (
    <div className="App">
      {session.started ? (
        <Simulator initMessage={initMessage} />
      ) : (
        <SessionScreen
          onMessageReceived={(message, url) => {
            setInitMessage(message);
            session.setSession({ ...session, started: true, url: url });
          }}
        />
      )}
    </div>
  );
}

export default App;
