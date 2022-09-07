import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";

interface LayoutProps {
  children: React.ReactElement;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }: LayoutProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Layout;
