import { useEffect, useState } from "react";
import { useUssd } from "../context/UssdContext";
import SessionScreen from "../components/SessionScreen";
import { generatePath, useNavigate } from "react-router-dom";

export interface IHomePageProps {}

const useNavigateParams = () => {
  const navigate = useNavigate();

  return (url: string, params: string) => {
    const path = generatePath(":url?:queryString", {
      url,
      queryString: params,
    });
    navigate(path);
  };
};

export default function HomePage(props: IHomePageProps) {
  const session = useUssd();
  const navigate = useNavigateParams();
  const [initMessage, setInitMessage] = useState("Please make a request");

  useEffect(() => {
    if (session.started) {
      navigate(`/simulator?`, `message=${initMessage}`);
    }
  }, [session, navigate, initMessage]);

  return (
    <div className="App">
      <SessionScreen
        onMessageReceived={(message, url) => {
          setInitMessage(message);
          session.setCurrentUrl?.(url);
          session.setSession({ ...session, started: true });
        }}
      />
    </div>
  );
}
