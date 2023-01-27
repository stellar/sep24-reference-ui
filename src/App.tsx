import { Layout } from "@stellar/design-system";
import { Home } from "pages/Home";
import { Kyc } from "pages/Kyc";
import { NotFound } from "pages/NotFound";
import { Status } from "pages/Status";
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

  // TODO: remove token
  const [jwtToken, setJwtToken] = useState(
    "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiMjQ3N2EyMDYwNTBkZTMxMGI1MzMyMjBiNjBkMGM2MjVhZjhkMmEwM2U0ODRiNjJhMGZhYTAwYjRlZDMwYjRhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgiLCJzdWIiOiJHQldBTzVFNlJRNjRVS1lINUlaSUk0S1RQUldHRVBZUkRLVlFFSVpVVkc1STQ1SFA0UzZHR0lWMiIsImlhdCI6MTY3NDg1NDk4OCwiZXhwIjoxNjc0OTQxMzg4fQ.gjtYoq8jP_uH5d_ew7cG6YXnybpdeNekB4jmO6kfoXg",
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [txnStatus, setTxnStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setQueryParam();
  }, []);

  useEffect(() => {
    if (jwtToken) {
      navigate({ pathname: "/kyc", search: location.search });
      // TODO: get txn from JTW to check status?
    }
  }, [jwtToken]);

  useEffect(() => {
    if (txnStatus) {
      navigate({ pathname: "/status", search: location.search });
    }
  }, [txnStatus]);

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
            <Route path="/" element={<Home errorMessage={errorMessage} />} />
            <Route
              path="/kyc"
              element={
                <ProtectedRoute>
                  <Kyc jwtToken={jwtToken} />
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
