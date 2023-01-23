import { Layout } from "@stellar/design-system";
import "./styles.scss";

export const App = () => {
  return (
    <>
      <Layout.Header projectTitle="SEP-24 Reference UI" hasDarkModeToggle />
      <Layout.Content>
        <Layout.Inset>Content</Layout.Inset>
      </Layout.Content>
      <Layout.Footer />
    </>
  );
};
