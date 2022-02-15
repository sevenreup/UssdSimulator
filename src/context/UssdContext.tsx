import { createContext, ReactNode, useContext, useState } from "react";

const defaultState: Session = {
  started: true,
  url: "",
  sessionId: "12345",
  msisdn: "265997655406",
  setSession: () => {},
};

interface Session {
  started: boolean;
  ended?: boolean;
  url: string;
  sessionId: string;
  msisdn: string;
  setCurrentUrl?: (text: string) => void;
  setStarted?: (value: boolean) => void;
  setSessionId?: (text: string) => void;
  setEnded?: (value: boolean) => void;
  setSession: (value: Session) => void;
}

const UssdContext = createContext<Session>(defaultState);

export const UssdProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session>(defaultState);

  const setCurrentUrl = (url: string) => {
    setSession({ ...session, url: url });
  };
  const setStarted = (value: boolean) => {
    setSession({ ...session, started: value });
  };
  const setSessionId = (id: string) => {
    setSession({ ...session, sessionId: id });
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
