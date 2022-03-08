import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { callUssd } from "../../api/api";
import { useUssd } from "../../context/UssdContext";
import PhoneKeyboard from "./PhoneKeyBoard";
import UssdCard from "./UssdCard";

const Container = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  flex-direction: column;
  justify-content: end;
  border-radius: 19px;
  overflow: hidden;
`;

const UssdContainer = styled.div`
  margin-bottom: 6px;
  margin-right: 10px;
  margin-left: 6px;
`;

export interface IPhoneContentProps {
  initialText: string;
}

export default function PhoneContent({ initialText }: IPhoneContentProps) {
  const [userInput, setUserInput] = useState("");
  const [responseText, setResponseText] = useState(initialText);
  const session = useUssd();
  const { setStarted } = session;

  useEffect(() => {
    console.log(initialText);

    setResponseText(initialText);
  }, [initialText]);

  const onSend = async () => {
    try {
      const data = await callUssd(session.data, userInput);
      setUserInput("");
      setResponseText(data.response);
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
          onChange={(text) => {
            setUserInput(text);
          }}
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
