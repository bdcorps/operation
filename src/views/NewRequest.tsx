import {
  Box,
  Button,
  ButtonGroup,
  FocusView,
  FormFieldGroup,
  Icon,
} from "@stripe/ui-extension-sdk/ui";
import { useState } from "react";
import RequestParameters from "../components/RequestParameters";
import RequestTest from "../components/RequestTest";

const Steps = [
  { id: 0, title: "Parameters", node: RequestParameters },
  { id: 1, title: "Test", node: RequestTest },
];

type focusProps = {
  shown: boolean;
  setShown: any;
};

export default function NewRequest({ shown, setShown }: focusProps) {
  const [currentStep, setCurrentStep] = useState<any>(Steps[0]);

  const footerContent = (
    <Box css={{ stack: "x", alignX: "end" }}>
      <ButtonGroup>
        <Button onPress={(e) => setCurrentStep(Steps[currentStep.id - 1])}>
          <Icon name="arrowLeft" />
          Back
        </Button>
        <Button
          type="primary"
          onPress={(e) => setCurrentStep(Steps[currentStep.id + 1])}
        >
          Continue
          <Icon name="arrowRight" />
        </Button>
      </ButtonGroup>
    </Box>
  );

  return (
    <FocusView
      title="New Request"
      shown={shown}
      setShown={setShown}
      footerContent={footerContent}
    >
      <FormFieldGroup
        layout="column"
        legend="Parameters"
        description={"STEP " + (currentStep.id + 1) + " OF " + Steps.length}
      >
        <currentStep.node></currentStep.node>
      </FormFieldGroup>
    </FocusView>
  );
}
