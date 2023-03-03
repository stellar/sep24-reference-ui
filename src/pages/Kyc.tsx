import { useState } from "react";
import { Input, Button, Heading2 } from "@stellar/design-system";
import { BUSINESS_SERVER_ENDPOINT } from "App";

export const Kyc = ({
  sessionToken,
  type,
  callback,
}: {
  sessionToken: string;
  type: "deposit" | "withdrawal";
  callback: (token: string) => void;
}) => {
  type DepositFields = {
    amount: string;
    name: string;
    surname: string;
    email: string;
  };

  type WithdrawFields = {
    amount: string;
    name: string;
    surname: string;
    email: string;
    bank: string;
    account: string;
  };

  type KycFields = {
    deposit?: DepositFields;
    withdrawal?: WithdrawFields;
  };

  const [kycFields, setKycFields] = useState<KycFields>({
    deposit: {
      amount: "",
      name: "",
      surname: "",
      email: "",
    },
    withdrawal: {
      amount: "",
      name: "",
      surname: "",
      email: "",
      bank: "",
      account: "",
    },
  });

  // TODO: update any type
  const handleChangeValue = (e: any) => {
    if (!type) {
      return;
    }

    setKycFields((prevState) => ({
      [type]: {
        ...prevState[type],
        [e.target.name]: e.target.value,
      },
    }));
  };

  // TODO: update any type
  const handleSubmitKyc = async (e: any) => {
    e.preventDefault();

    if (!type) {
      return;
    }

    try {
      const response = await fetch(`${BUSINESS_SERVER_ENDPOINT}/submit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kycFields[type]),
      });

      const { sessionId } = await response.json();
      callback(sessionId);
    } catch (e: any) {
      // TODO: handle error
      console.log(e);
    }
  };

  const renderDepositFields = () => {
    return (
      <>
        <Heading2>Deposit</Heading2>
        <Input
          label="Amount"
          id="amount"
          name="amount"
          value={kycFields.deposit?.amount || ""}
          onChange={handleChangeValue}
          required
        />
        <Input
          label="First name"
          id="name"
          name="name"
          value={kycFields.deposit?.name || ""}
          onChange={handleChangeValue}
          required
        />
        <Input
          label="Last name"
          id="surname"
          name="surname"
          value={kycFields.deposit?.surname || ""}
          onChange={handleChangeValue}
          required
        />
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          value={kycFields.deposit?.email || ""}
          onChange={handleChangeValue}
          required
        />
      </>
    );
  };

  const renderWithdrawFields = () => {
    return (
      <>
        <Heading2>Withdrawal</Heading2>
        <Input
          label="Amount"
          id="amount"
          name="amount"
          value={kycFields.withdrawal?.amount || ""}
          onChange={handleChangeValue}
          required
        />
        <Input
          label="First name"
          id="name"
          name="name"
          value={kycFields.withdrawal?.name || ""}
          onChange={handleChangeValue}
          required
        />
        <Input
          label="Last name"
          id="surname"
          name="surname"
          value={kycFields.withdrawal?.surname || ""}
          onChange={handleChangeValue}
          required
        />
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          value={kycFields.withdrawal?.email || ""}
          onChange={handleChangeValue}
          required
        />
        <Input
          label="Bank"
          id="bank"
          name="bank"
          value={kycFields.withdrawal?.bank || ""}
          onChange={handleChangeValue}
          required
        />
        <Input
          label="Account"
          id="account"
          name="account"
          value={kycFields.withdrawal?.account || ""}
          onChange={handleChangeValue}
          required
        />
      </>
    );
  };

  if (!type) {
    return <div>Loading...</div>;
  }

  return (
    <form className="FormContainer" onSubmit={handleSubmitKyc}>
      {type === "deposit" ? renderDepositFields() : null}
      {type === "withdrawal" ? renderWithdrawFields() : null}
      <Button type="submit">Submit</Button>
    </form>
  );
};
