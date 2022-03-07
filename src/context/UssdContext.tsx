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
  setAppData?: (values: any) => Promise<void>;
  setStarted?: (value: boolean) => void;
  setSessionId?: (text: string) => void;
  setEnded?: (value: boolean) => void;
  setSession: (value: Session) => void;
  updateAppData?: () => void;
}

const UssdContext = createContext<Session>(defaultState);

export const UssdProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session>(defaultState);

  useEffect(() => {
    window.onstorage = (event) => {
      console.log(event);
      updateAppData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAppData = (value: any) => {
    return new Promise<void>((resolve, reject) => {
      Object.keys(value).forEach((key) => {
        Datastore.set(key, value[key]);
      });
      updateAppData();
      resolve();
    });
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

  const updateAppData = () => {
    setSession({ ...session, data: Datastore.getData() });
  };

  return (
    <UssdContext.Provider
      value={{
        ...session,
        setAppData,
        setStarted,
        setSessionId,
        setEnded,
        setSession,
        updateAppData,
      }}
    >
      {children}
    </UssdContext.Provider>
  );
};

export const useUssd = () => useContext(UssdContext);
