import { useEffect, useState } from "react";
import { Heading2 } from "@stellar/design-system";
import { fetchTransaction } from "helpers/fetchTransaction";

export const Status = ({
  txnInfo,
  sessionToken,
}: {
  // TODO: any type
  txnInfo: any;
  sessionToken: string;
}) => {
  const [info, setInfo] = useState<any>(txnInfo);
  const re = /(.*:)?(.*)(:.*)/gi;

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

  const formatAmount = (amount: string, amountAsset: string) => {
    return `${amount || ""} ${(amountAsset || "").replace(re, "$2")}`;
  };

  const getTransactionId = (info: any) => {
    if (
      info.stellar_transactions === undefined ||
      info.stellar_transactions === null
    ) {
      return "-";
    } else {
      return info.stellar_transactions[0]?.id || "-";
    }
  };

  return (
    <>
      <Heading2>Transaction information</Heading2>
      <div className="TxnInfo">
        <div className="TxnInfo__row">
          <div className="TxnInfo__row__label">Transaction type</div>
          <div className="TxnInfo__row__value">{info.kind}</div>
        </div>

        <div className="TxnInfo__row">
          <div className="TxnInfo__row__label">Transaction ID</div>
          <div className="TxnInfo__row__value">{info.id}</div>
        </div>

        <div className="TxnInfo__row">
          <div className="TxnInfo__row__label">Send amount</div>
          <div className="TxnInfo__row__value">
            {formatAmount(info.amount_in?.amount, info.amount_in?.asset)}
          </div>
        </div>

        <div className="TxnInfo__row">
          <div className="TxnInfo__row__label">Receive amount</div>
          <div className="TxnInfo__row__value">
            {formatAmount(info.amount_out?.amount, info.amount_out?.asset)}
          </div>
        </div>

        <div className="TxnInfo__row">
          <div className="TxnInfo__row__label">Fee amount</div>
          <div className="TxnInfo__row__value">
            {formatAmount(info.amount_fee?.amount, info.amount_fee?.asset)}
          </div>
        </div>

        <div className="TxnInfo__row">
          <div className="TxnInfo__row__label">Transaction status</div>
          <div className="TxnInfo__row__value">{info.status}</div>
        </div>

        {/* TODO: don't have started field in response */}
        {/* <div className="TxnInfo__row">
          <div className="TxnInfo__row__label">Started</div>
          <div className="TxnInfo__row__value"></div>
        </div> */}

        <div className="TxnInfo__row">
          <div className="TxnInfo__row__label">Message</div>
          <div className="TxnInfo__row__value">{info.message || "-"}</div>
        </div>

        <div className="TxnInfo__row">
          <div className="TxnInfo__row__label">Memo</div>
          <div className="TxnInfo__row__value">{info.memo || "-"}</div>
        </div>

        <div className="TxnInfo__row">
          <div className="TxnInfo__row__label">Stellar transaction ID</div>
          <div className="TxnInfo__row__value">{getTransactionId(info)}</div>
        </div>

        <div className="TxnInfo__row">
          <div className="TxnInfo__row__label">Destination account</div>
          <div className="TxnInfo__row__value">
            {info.destination_account || "-"}
          </div>
        </div>
      </div>
    </>
  );
};
