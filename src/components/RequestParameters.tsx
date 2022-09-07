import {
  Box,
  Button,
  Select,
  TextArea,
  TextField,
} from "@stripe/ui-extension-sdk/ui";
import { useState } from "react";

const RequestParametersForm = () => {
  const [method, setMethod] = useState<string>("GET");
  const [path, setPath] = useState<string>("/");
  // TODO: try form validation
  return (
    <Box css={{ height: "fill", stack: "y", distribute: "space-between" }}>
      <Select
        css={{ width: "fit" }}
        name="select-method"
        label="Method"
        defaultValue={method}
        onChange={(e) => {
          setMethod(e.target.value);
        }}
      >
        <option value="">Choose an Option</option>
        <option value="GET">GET</option>
        {/* <option value='post'>POST</option>
        <option value='put'>PUT</option>
        <option value='delete'>DELETE</option>
        <option value='patch'>PATCH</option> */}
      </Select>
      <Box css={{ marginTop: "medium" }}>
        <TextField
          label="URL"
          placeholder="URL"
          defaultValue={path}
          onChange={(e) => {
            // TODO: track form state
            setPath(e.target.value);
          }}
        />
      </Box>
      <Box css={{ marginTop: "medium" }}>
        <TextArea
          label="Body"
          placeholder="Body"
          defaultValue=""
          rows={8}
          onChange={(e) => {
            // TODO: track form state
          }}
        />
      </Box>
      <Button onPress={() => {}}></Button>
    </Box>
  );
};

export default RequestParametersForm;
