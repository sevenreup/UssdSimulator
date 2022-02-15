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
  onSave: () => void;
  onCancel: () => void;
}

export default function UssdCard({
  input,
  responseText,
  onSave,
  onCancel,
}: IUssdCardProps) {
  return (
    <Card>
      <CardContent>
        {responseText.split("\n").map((str) => (
          <Typography>{str}</Typography>
        ))}
        <TextField value={input} />
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Button variant="text" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="text" onClick={onSave}>
          Send
        </Button>
      </CardActions>
    </Card>
  );
}
