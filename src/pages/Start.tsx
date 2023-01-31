import { useEffect } from "react";
import { BUSINESS_SERVER_ENDPOINT } from "App";

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

  return <div>Starting session...</div>;
};
