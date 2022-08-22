import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import {
  Accordion,
  AccordionItem,
  Box,
  Button,
  ButtonGroup,
  ContextView,
  Icon,
  Inline,
  Link,
  List,
  ListItem,
} from "@stripe/ui-extension-sdk/ui";

import NewRequest from "./NewRequest";

import BrandIcon from "./brand_icon.svg";
import { FunctionComponent, useState } from "react";

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

const App = ({ userContext, environment }: ExtensionContextValue) => {
  // let shown = true;
  const [showCreateRequest, setShowCreateRequest] = useState(false);

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

export default App;
