import * as React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  SelectChangeEvent,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { XMLParser } from "fast-xml-parser";
import KeyChangePicker from "./KeyChange";

export interface IEditorProps {
  type: string;
  value: string;
  savedKeys?: any;
  onSave: (value: string, type: string, extra?: any | null) => void;
}

export default function ValueEditor({
  type,
  value,
  savedKeys,
  onSave,
}: IEditorProps) {
  const [dataType, setDataType] = React.useState(type);
  const [selectedKey, setSelectedKey] = React.useState(savedKeys);
  const [parseError, setParseError] = React.useState("");
  const [dataKeys, setDataKeys] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setDataType(event.target.value as string);
  };

  const [code, setCode] = React.useState(value);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select label="Type" value={dataType} onChange={handleChange}>
            <MenuItem value={"json"}>Json</MenuItem>
            <MenuItem value={"xml"}>Xml</MenuItem>
          </Select>
        </FormControl>
        <Box marginTop={2} marginBottom={2}>
          <CodeEditor
            value={code}
            language={dataType}
            placeholder="Please body."
            onChange={(evn) => setCode(evn.target.value)}
            padding={15}
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </Box>
        {parseError !== "" && <Box>{parseError}</Box>}
        <Button
          variant="contained"
          onClick={async () => {
            console.log(dataType);
            try {
              if (dataType === "json") {
                const data = JSON.parse(code);
                const keys = Object.keys(data);
                setDataKeys(keys);
              } else {
                const options = {
                  ignoreDeclaration: true,
                };

                const parser = new XMLParser(options);
                let jsonObj = parser.parse(code);
                let firstObj = Object.keys(jsonObj[Object.keys(jsonObj)[0]]);
                setDataKeys(firstObj);
              }
            } catch (error) {
              console.log(error);

              setParseError(JSON.stringify(error));
            }
          }}
        >
          Parse
        </Button>
      </Grid>
      <Box marginBottom={2}>
        {dataKeys.length < 0 && <Typography>No Keys parsed</Typography>}
      </Box>
      <Grid item xs={12}>
        {Object.keys(savedKeys).map((key) => (
          <React.Fragment key={key}>
            <Box>
              <Typography gutterBottom>
                {key
                  .replace(/([A-Z])/g, (match) => ` ${match}`)
                  .replace(/^./, (match) => match.toUpperCase())
                  .trim()}
                : {savedKeys[key]}
              </Typography>
            </Box>
            {dataKeys.length > 0 && (
              <KeyChangePicker
                key={key}
                keys={dataKeys}
                onKeyChange={(value) => {
                  var data = { ...selectedKey };
                  data[key] = value;
                  setSelectedKey(data);
                }}
              />
            )}
          </React.Fragment>
        ))}

        <Button
          variant="contained"
          onClick={() => {
            onSave(code, dataType, selectedKey);
          }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}
