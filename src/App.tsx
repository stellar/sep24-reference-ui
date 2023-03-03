import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Layout } from "@stellar/design-system";

import { fetchTransaction } from "helpers/fetchTransaction";
import { Kyc } from "pages/Kyc";
import { NotFound } from "pages/NotFound";
import { Start } from "pages/Start";
import { Status } from "pages/Status";
import { Welcome } from "pages/Welcome";

import "./styles.scss";

// TODO: move to ENV?
export const BUSINESS_SERVER_ENDPOINT = "http://localhost:8091";

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  // TODO: any type
  const [txnInfo, setTxnInfo] = useState<any>();

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
      handleStartSession(sessionToken);
    }
  }, [sessionToken]);

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

  const handleStartSession = async (sToken: string) => {
    const txnInfo = await fetchTransaction(sToken);
    setTxnInfo(txnInfo);

    if (txnInfo.status === "incomplete") {
      navigate({ pathname: "/kyc", search: `?session_token=${sToken}` });
    } else {
      navigate({ pathname: "/status", search: `?session_token=${sToken}` });
    }
  };

  const handleFinishTransaction = (sToken: string) => {
    navigate({ pathname: "/status", search: `?session_token=${sToken}` });
  };

  const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    return sessionToken ? (
      children
    ) : (
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
                  <Kyc
                    type={txnInfo?.kind}
                    sessionToken={sessionToken}
                    callback={handleFinishTransaction}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/status"
              element={
                <ProtectedRoute>
                  <Status txnInfo={txnInfo} sessionToken={sessionToken} />
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
