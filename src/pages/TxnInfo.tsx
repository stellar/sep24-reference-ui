import { useEffect, useState } from "react";
import { Heading2 } from "@stellar/design-system";
import { fetchTransaction } from "helpers/fetchTransaction";
import TxnInfoBlock from "../components/TxnInfoBlock";

export const TxnInfo = ({ txnId }: { txnId: string | null }) => {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    if (txnId) pollTransaction(txnId);
  }, [txnId]);

  const pollTransaction = async (txnId: string) => {
    const txnResponse = await fetchTransaction(txnId);
    setInfo(txnResponse);
  };

  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Heading2>Transaction information</Heading2>

      <TxnInfoBlock info={info} />
    </>
  );
};
