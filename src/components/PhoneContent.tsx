import styled from "@emotion/styled";
import { useState } from "react";
import { callUssd } from "../api/api";
import { useUssd } from "../context/UssdContext";
import { SessionTypes } from "../model/UssdRequest";
import PhoneKeyboard from "./PhoneKeyBoard";
import UssdCard from "./UssdCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: end;
`;

const UssdContainer = styled.div``;

export interface IPhoneContentProps {
  initialText: string;
}

export default function PhoneContent({ initialText }: IPhoneContentProps) {
  const { setStarted, url, msisdn, sessionId } = useUssd();
  const [userInput, setUserInput] = useState("");
  const [responseText, setResponseText] = useState(initialText);

  const onSend = async () => {
    try {
      const data = await callUssd(url, {
        Msisdn: msisdn,
        SessionId: sessionId,
        Message: userInput,
        SessionType: SessionTypes.Continuation,
      });
      setResponseText(data.Response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <UssdContainer>
        <UssdCard
          input={userInput}
          responseText={responseText}
          onCancel={() => {
            setStarted?.(false);
          }}
          onSave={onSend}
        />
      </UssdContainer>
      <PhoneKeyboard
        inputText={userInput}
        onTextChange={(text) => {
          setUserInput(text);
        }}
      />
    </Container>
  );
}
