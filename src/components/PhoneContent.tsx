import styled from "@emotion/styled";
import { useState } from "react";
import PhoneKeyboard from "./PhoneKeyBoard";
import UssdCard from "./UssdCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: end;
`;

const UssdContainer = styled.div``;

export interface IPhoneContentProps {}

export default function PhoneContent(props: IPhoneContentProps) {
  const [userInput, setUserInput] = useState("");

  return (
    <Container>
      <UssdContainer>
        <UssdCard input={userInput}/>
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
