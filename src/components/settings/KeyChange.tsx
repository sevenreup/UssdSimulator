import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

export interface IKeyChangePickerProps {
  key: string;
  keys: string[];
  onKeyChange: (value: string) => void;
}

export default function KeyChangePicker({
  onKeyChange,
  key,
  keys,
}: IKeyChangePickerProps) {
  return (
    <FormControl fullWidth>
      <InputLabel>Key</InputLabel>
      <Select
        value={key}
        label="Key"
        onChange={(event: SelectChangeEvent) => {
          onKeyChange(event.target.value as string);
        }}
      >
        {keys.map((value) => (
          <MenuItem value={value} key={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
