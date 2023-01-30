import { BUSINESS_SERVER_ENDPOINT } from "App";
import { useEffect } from "react";

export const Start = ({
  token,
  callback,
}: {
  token: string;
  callback: (token: string) => void;
}) => {
  useEffect(() => {
    fetchSessionToken();
  }, []);

  const fetchSessionToken = async () => {
    try {
      // TODO: deposit or withdraw?
      const response = await fetch(`${BUSINESS_SERVER_ENDPOINT}/start`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { sessionId } = await response.json();
      callback(sessionId);
    } catch (e: any) {
      // TODO: handle error
      console.log(e);
    }
  };

  // TODO: update text
  return <div>Starting session...</div>;
};
