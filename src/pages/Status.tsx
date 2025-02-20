import { useEffect, useState } from "react";
import { Heading2 } from "@stellar/design-system";
import { fetchTransaction } from "helpers/fetchTransaction";
import TxnInfoBlock from "../components/TxnInfoBlock";

export const Status = ({
  txnInfo,
  sessionToken,
}: {
  // TODO: any type
  txnInfo: any;
  sessionToken: string;
}) => {
  const [info, setInfo] = useState<any>(txnInfo);

  useEffect(() => {
    pollTransaction();
  }, []);

  const endStatus = ["pending_external", "completed", "error"];

  const pollTransaction = async () => {
    while (!endStatus.includes(info.status)) {
      const txnResponse = await fetchTransaction(sessionToken);
      setInfo(txnResponse);

      // Check for update every 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  };

  return (
    <>
      <Heading2>Transaction information</Heading2>
      <TxnInfoBlock info={info} />
    </>
  );
};
