import { useState } from "react";
import Phone from "./components/phone";
import PhoneContent from "./components/PhoneContent";
import SessionScreen from "./components/SessionScreen";
import { useUssd } from "./context/UssdContext";

function App() {
  const session = useUssd();
  const [initMessage, setInitMessage] = useState("Please make a request");
  return (
    <div className="App">
      {session.started ? (
        <Phone>
          <PhoneContent initialText={initMessage} />
        </Phone>
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
