import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import {
  Box,
  Button,
  ButtonGroup,
  Inline,
  SettingsView,
  TextField,
} from "@stripe/ui-extension-sdk/ui";
import { FunctionComponent, useState } from "react";
import {
  useAccount,
  useCreateAccount,
  useDeleteAccount,
  useUpdateAccount,
} from "../hooks/api";

const Settings: FunctionComponent<ExtensionContextValue> = ({
  userContext,
  environment,
}: ExtensionContextValue) => {
  const stripeAccountId = userContext?.account.id;
  const stripeName = `${userContext?.account.name?.trim()}'s store`;
  const { data: store, isLoading, isFetching } = useAccount(stripeAccountId);

  const [status, setStatus] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { mutate: createAccountMutation } = useCreateAccount();
  const { mutate: deleteAccountMutation } = useDeleteAccount();
  const { mutate: updateAccountMutation } = useUpdateAccount();

  const saveSettings = async (values: any) => {
    setStatus("Saving...");
    try {
      await updateAccountMutation({
        accountId: stripeAccountId,
        values,
      });
    } catch (error) {
      setStatus("Error");
      console.error(error);
    }
    setStatus("Saved!");
  };

  return (
    <SettingsView onSave={saveSettings} statusMessage={status}>
      <Box
        css={{
          paddingY: "xxlarge",
          paddingX: "xxlarge",
          background: "container",
        }}
      >
        {/* todo: fix this */}
        {!store ? (
          <Box
            css={{
              background: "surface",
              layout: "column",
              gap: "xxlarge",
              padding: "xlarge",
            }}
          >
            <Box css={{ layout: "column", gap: "medium" }}>
              <Inline>
                No account found. Create a new one to edit related Settings.
              </Inline>

              <Button
                type="primary"
                css={{ width: "fill", alignX: "center" }}
                onPress={async () => {
                  await createAccountMutation({
                    accountId: stripeAccountId,
                    name: stripeName,
                  });
                }}
              >
                Create Account
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            css={{
              background: "surface",
              layout: "column",
              gap: "xlarge",
              padding: "xlarge",
            }}
          >
            <Box css={{ layout: "column", gap: "medium" }}>
              <TextField
                name="name"
                label="Account name"
                defaultValue={store.name}
                placeholder="My cool store"
                required
              />
              <TextField
                name="baseUrl"
                label="Base URL"
                defaultValue={store.baseUrl}
                placeholder="https://mycoolicon.com"
              />
            </Box>
            <Button
              type="destructive"
              css={{ alignX: "center" }}
              onPress={() => {
                setShowDeleteConfirm(true);
              }}
              disabled={showDeleteConfirm}
            >
              Delete my store
            </Button>

            {showDeleteConfirm && (
              <Box css={{ layout: "column", gap: "small" }}>
                <Inline>Are you sure you want to delete your account?</Inline>
                <ButtonGroup>
                  <Button onPress={() => setShowDeleteConfirm(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="destructive"
                    onPress={async () => {
                      if (!stripeAccountId) return;

                      await deleteAccountMutation({
                        accountId: stripeAccountId,
                      });
                      setStatus("Account deleted!");
                      setShowDeleteConfirm(false);
                    }}
                  >
                    Yes, Delete
                  </Button>
                </ButtonGroup>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </SettingsView>
  );
};

export default Settings;
