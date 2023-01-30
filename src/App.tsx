import { Layout } from "@stellar/design-system";
import { Kyc } from "pages/Kyc";
import { NotFound } from "pages/NotFound";
import { Start } from "pages/Start";
import { Status } from "pages/Status";
import { Welcome } from "pages/Welcome";
import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./styles.scss";

// TODO: move to ENV?
export const BUSINESS_SERVER_ENDPOINT = "http://localhost:8091";

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  // const [txnStatus, setTxnStatus] = useState("");

  // Set token or session token in state
  useEffect(() => {
    setQueryParam();
  }, [location.search]);

  // Get session token from token
  useEffect(() => {
    if (token) {
      navigate({ pathname: "/start", search: location.search });
    }
  }, [token]);

  // Set session token if page refreshed
  useEffect(() => {
    if (sessionToken) {
      navigate({ pathname: "/kyc", search: location.search });
    }
  }, [sessionToken]);

  // useEffect(() => {
  //   if (txnStatus) {
  //     navigate({ pathname: "/status", search: location.search });
  //   }
  // }, [txnStatus]);

  const setQueryParam = () => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const sessionToken = queryParams.get("session_token");

    if (token) {
      setToken(token);
      setSessionToken("");
    } else if (sessionToken) {
      setToken("");
      setSessionToken(sessionToken);
    } else {
      // TODO: handle error
    }
  };

  const handleStartSession = (sToken: string) => {
    navigate({ pathname: "/kyc", search: `?session_token=${sToken}` });
  };

  const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    return sessionToken ? (
      children
    ) : (
      // TODO: can navigate to a different page
      <Navigate to={{ pathname: "/", search: "" }} />
    );
  };

  return (
    <>
      <Layout.Header projectTitle="SEP-24 Reference UI" hasDarkModeToggle />
      <Layout.Content>
        <Layout.Inset>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/start"
              element={<Start token={token} callback={handleStartSession} />}
            />
            <Route
              path="/kyc"
              element={
                <ProtectedRoute>
                  <Kyc sessionToken={sessionToken} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/status"
              element={
                <ProtectedRoute>
                  <Status />
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
