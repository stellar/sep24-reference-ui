import { Button, InfoBlock, Layout } from "@stellar/design-system";
import { NotFound } from "pages/NotFound";
import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./styles.scss";

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [jwtToken, setJwtToken] = useState("");
  const [txnStatus, setTxnStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setQueryParam();
  }, []);

  useEffect(() => {
    if (jwtToken) {
      navigate({ pathname: "/kyc", search: location.search });
      // TODO: get txn from JTW to check status
    }
  }, [jwtToken]);

  useEffect(() => {
    if (txnStatus) {
      navigate({ pathname: "/status", search: location.search });
    }
  }, [txnStatus]);

  // TODO: move to pages
  const HomePage = () => (
    <>
      {errorMessage ? (
        <InfoBlock variant={InfoBlock.variant.error}>{errorMessage}</InfoBlock>
      ) : null}
      <div>Home</div>
    </>
  );
  const KycPage = () => (
    <>
      <div>KYC</div>
      <Button onClick={handleSubmitKyc}>Submit</Button>
    </>
  );

  // TODO: poll for status updates on this page, update txnStatus with callback
  const StatusPage = () => <div>Status/confirmation</div>;

  const setQueryParam = () => {
    const queryParams = new URLSearchParams(location.search);

    const jwtToken = queryParams.get("jwt_token");

    // TODO: validate JWT token
    if (jwtToken !== null) {
      setJwtToken(jwtToken);
    } else {
      setErrorMessage("JWT is missing");
    }
  };

  const handleSubmitKyc = () => {
    // TODO: submit to backend
    setTxnStatus("started");
  };

  const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    return jwtToken ? (
      children
    ) : (
      <Navigate to={{ pathname: "/", search: location.search }} />
    );
  };

  return (
    <>
      <Layout.Header projectTitle="SEP-24 Reference UI" hasDarkModeToggle />
      <Layout.Content>
        <Layout.Inset>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/kyc"
              element={
                <ProtectedRoute>
                  <KycPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/status"
              element={
                <ProtectedRoute>
                  <StatusPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout.Inset>
      </Layout.Content>
      <Layout.Footer />
    </>
  );
};
