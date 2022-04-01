import {
  ConfigKeys,
  generalDocSample,
  requestDocSample,
  responseDocSample,
  useGetAllConfigs,
} from "hooks/config-docs";
import { GeneralConfig, RequestConfig, ResponseConfig } from "model/configs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePouch } from "use-pouchdb";

const defaultState: Session = {
  started: false,
  generalConfig: generalDocSample,
  requestConfig: requestDocSample,
  responseConfig: responseDocSample,
  setSession: () => {},
};

interface Session {
  started: boolean;
  ended?: boolean;
  generalConfig: GeneralConfig;
  responseConfig: ResponseConfig;
  requestConfig: RequestConfig;
  setAppData?: (values: any) => Promise<void>;
  setStarted?: (value: boolean) => void;
  setSessionId?: (text: string) => void;
  setEnded?: (value: boolean) => void;
  setSession: (value: Session) => void;
  updateAppData?: () => void;
}

const UssdContext = createContext<Session>(defaultState);

export const UssdProvider = ({ children }: { children: ReactNode }) => {
  const { state, rows } = useGetAllConfigs();
  const [session, setSession] = useState<Session>(defaultState);
  const db = usePouch();

  useEffect(() => {
    if (state === "done") {
      if (rows.length <= 0) {
        db.bulkDocs([
          { _id: ConfigKeys.general, ...generalDocSample },
          { _id: ConfigKeys.request, ...requestDocSample },
          { _id: ConfigKeys.response, ...responseDocSample },
        ]);
      } else {
        // TODO: Fix this ts soup
        var obj = rows.reduce(function (acc, cur, i) {
          // @ts-ignore
          acc[cur.id] = cur.doc;
          return acc;
        }, {});
        // @ts-ignore
        const data = {
          ...session,
          // @ts-ignore
          generalConfig: obj["conf_general_doc"],
          // @ts-ignore
          responseConfig: obj["conf_response_doc"],
          // @ts-ignore
          requestConfig: obj["conf_request_doc"],
        };
        setSession(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, rows, db, setSession]);

  const setStarted = (value: boolean) => {
    setSession({ ...session, started: value });
  };

  const setEnded = (value: boolean) => {
    setSession({ ...session, ended: value });
  };

  return (
    <UssdContext.Provider
      value={{
        ...session,
        setStarted,
        setEnded,
        setSession,
      }}
    >
      {children}
    </UssdContext.Provider>
  );
};

export const useUssd = () => useContext(UssdContext);
