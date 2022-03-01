import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Datastore from "../local/DataStore";
import AppData from "../model/appdata";

const defaultState: Session = {
  started: false,
  data: Datastore.getData(),
  setSession: () => {},
};

interface Session {
  started: boolean;
  ended?: boolean;
  data: AppData;
  setCurrentUrl?: (text: string) => void;
  setStarted?: (value: boolean) => void;
  setSessionId?: (text: string) => void;
  setEnded?: (value: boolean) => void;
  setSession: (value: Session) => void;
}

const UssdContext = createContext<Session>(defaultState);

export const UssdProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session>(defaultState);

  useEffect(() => {
    window.onstorage = (event) => {
      setSession({ ...session, data: Datastore.getData() });
    };
  }, []);

  const setCurrentUrl = (url: string) => {
    Datastore.set("url", url);
  };
  const setStarted = (value: boolean) => {
    setSession({ ...session, started: value });
  };
  const setSessionId = (id: string) => {
    Datastore.set("sessionId", id);
  };
  const setEnded = (value: boolean) => {
    setSession({ ...session, ended: value });
  };

  return (
    <UssdContext.Provider
      value={{
        ...session,
        setCurrentUrl,
        setStarted,
        setSessionId,
        setEnded,
        setSession,
      }}
    >
      {children}
    </UssdContext.Provider>
  );
};

export const useUssd = () => useContext(UssdContext);
