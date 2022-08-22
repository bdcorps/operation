import {
  Box,
  FormFieldGroup,
  Select,
  TextArea,
  TextField,
} from "@stripe/ui-extension-sdk/ui";

type Props = {};

const RequestParametersForm = ({}: any) => {
  // TODO: try form validation
  return (
    <Box css={{ height: "fill", stack: "y", distribute: "space-between" }}>
      <Select
        css={{ width: "fit", marginY: "medium" }}
        name="select-method"
        label="Method"
        onChange={(e) => {
          // TODO: track form state
        }}
      >
        <option value="">Choose an option</option>
        <option value="get">GET</option>
        {/* <option value='post'>POST</option>
        <option value='put'>PUT</option>
        <option value='delete'>DELETE</option>
        <option value='patch'>PATCH</option> */}
      </Select>
      <Box css={{ marginTop: "medium" }}>
        <TextField
          label="URL"
          placeholder="URL"
          onChange={(e) => {
            // TODO: track form state
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
    </Box>
  );
};

export default RequestParametersForm;
