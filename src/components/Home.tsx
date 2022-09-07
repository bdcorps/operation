import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import {
  Accordion,
  AccordionItem,
  Box,
  Button,
  ButtonGroup,
  ContextView,
  Icon,
} from "@stripe/ui-extension-sdk/ui";
import { FunctionComponent, useState } from "react";
import { useCreateAccount } from "../hooks/api";
import BrandIcon from "../views/brand_icon.svg";
import NewRequest from "../views/NewRequest";

interface InfoBlockProps {
  title: string;
  description: string;
}

const InfoBlock: FunctionComponent<InfoBlockProps> = ({
  title,
  description,
}: InfoBlockProps) => {
  return (
    <AccordionItem title={title} subtitle={description}>
      <Box css={{ stack: "x", alignX: "end", marginY: "large" }}>
        <ButtonGroup>
          <Button>Edit</Button>
          <Button type="destructive">Delete</Button>
        </ButtonGroup>
      </Box>
    </AccordionItem>
  );
};

const Home: FunctionComponent<ExtensionContextValue> = ({
  userContext,
  environment,
}: ExtensionContextValue) => {
  const [showCreateRequest, setShowCreateRequest] = useState(false);

  const { mutate: createAccountMutation } = useCreateAccount();

  // createAccountMutation

  return (
    <ContextView
      title="Sukh's Operation"
      brandColor="#F6F8FA" // replace this with your brand color
      brandIcon={BrandIcon}
      externalLink={{
        label: "View activity",
        href: "https://stripe.com/docs/stripe-apps",
      }}
    >
      <Box>
        <Button
          type="primary"
          css={{ width: "fill" }}
          onPress={(e: any) => {
            console.log({ showCreateRequest });
            setShowCreateRequest(true);
          }}
        >
          <Icon name="addCircle" />
          New Request
        </Button>
        <Accordion>
          <InfoBlock title="23" description="Trips booked last month" />
          <InfoBlock title="47" description="Invoices Received" />
        </Accordion>
        {showCreateRequest && (
          <NewRequest
            shown={showCreateRequest}
            setShown={setShowCreateRequest}
          />
        )}
      </Box>
    </ContextView>
  );
};

export default Home;
