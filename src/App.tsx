import Phone from "./components/phone";
import PhoneContent from "./components/PhoneContent";
import SessionScreen from "./components/SessionScreen";
import { useUssd } from "./context/UssdContext";

function App() {
  const { started } = useUssd();

  return (
    <div className="App">
      {started ? (
        <Phone>
          <PhoneContent initialText={"Please make a request"} />
        </Phone>
      ) : (
        <SessionScreen />
      )}
    </div>
  );
}

export default App;
