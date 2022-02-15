import styled from "@emotion/styled";
import * as React from "react";

export interface IUssdCardProps {
    input: string
}

const Card = styled.div`
  background: #424242;
  box-shadow: 0 22px 38px #00000042;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue,
    Helvetica, Arial, Lucida Grande, sans-serif;
  overflow: hidden;
  padding: 5px;
  touch-action: manipulation;
  -webkit-user-select: none;
  user-select: none;
  width: 100%;
`;

const UssdInput = styled.input``;

const UssdText = styled.p``;

const Button = styled.button`
  background: transparent;
  border: none;
  color: blue;
  padding: 10px 20px;
`;

export default function UssdCard({ input }: IUssdCardProps) {
  return (
    <Card>
      <div>
        <div>
          <UssdText>Dial Short Code</UssdText>
        </div>
        <UssdInput type="text" value={input}/>
        <div>
          <Button>Cancel</Button>
          <Button>Send</Button>
        </div>
      </div>
    </Card>
  );
}
