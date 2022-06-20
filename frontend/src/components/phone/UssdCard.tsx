import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

export interface IUssdCardProps {
  input: string;
  responseText: string;
  onChange: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const CardHolder = styled(CardContent)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default function UssdCard({
  input,
  responseText,
  onChange,
  onSave,
  onCancel,
}: IUssdCardProps) {
  return (
    <Card>
      <CardHolder sx={{}}>
        {responseText.split("\n").map((str) => (
          <Typography key={str} variant="caption" display="block">
            {str}
          </Typography>
        ))}
        <TextField
          value={input}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          sx={{ marginTop: 1 }}
          size="small"
        />
      </CardHolder>
      <CardActions
        sx={{
          justifyContent: "space-between",
          padding: "0 10px",
        }}
      >
        <Button variant="text" onClick={onCancel} size="small">
          Cancel
        </Button>
        <Button variant="text" onClick={onSave} size="small">
          Send
        </Button>
      </CardActions>
    </Card>
  );
}
