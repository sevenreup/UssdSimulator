import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useUssdCall } from "api";
import { useEffect, useState } from "react";
import { useUssd } from "../../context/UssdContext";
import PhoneKeyboard from "./PhoneKeyBoard";
import UssdCard from "./UssdCard";
import { useNavigate } from "react-router-dom";

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
  const [closeDialog, setCloseDialog] = useState(false);
  const session = useUssd();
  const { refetch, data, status, error } = useUssdCall(userInput);
  const { setStarted } = session;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(initialText);

    setResponseText(initialText);
  }, [initialText]);

  useEffect(() => {
    if (status === "success") {
      setUserInput("");
      setResponseText(data?.response!);
    } else if (status === "error") {
      console.log(error);
    }
  }, [data, status, error]);

  return (
    <Container>
      <Dialog open={closeDialog} onClose={() => setCloseDialog(false)}>
        <DialogTitle>End Session</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to end session?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCloseDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setStarted?.(false);
              navigate("/");
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <UssdContainer>
        <UssdCard
          input={userInput}
          responseText={responseText}
          onChange={(text) => {
            setUserInput(text);
          }}
          onCancel={() => {
            setCloseDialog(true);
          }}
          onSave={() => refetch()}
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
