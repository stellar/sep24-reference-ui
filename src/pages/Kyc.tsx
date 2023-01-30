import { Input, Button, Heading2 } from "@stellar/design-system";
import { BUSINESS_SERVER_ENDPOINT } from "App";
import { useEffect, useState } from "react";

export const Kyc = ({ sessionToken }: { sessionToken: string }) => {
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
    withdraw?: WithdrawFields;
  };

  const [type, setType] = useState<"deposit" | "withdraw">();
  // TODO: remove default values
  const [kycFields, setKycFields] = useState<KycFields>({
    deposit: {
      amount: "100",
      name: "Test",
      surname: "Tester",
      email: "test@test.com",
    },
    withdraw: {
      amount: "100",
      name: "Test",
      surname: "Tester",
      email: "test@test.com",
      bank: "My bank",
      account: "123123123",
    },
  });

  useEffect(() => {
    fetchTransaction();
  }, [sessionToken]);

  const fetchTransaction = async () => {
    try {
      const response = await fetch(`${BUSINESS_SERVER_ENDPOINT}/transaction`, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const { kind } = await response.json();
      setType(kind);
    } catch (e: any) {
      // TODO: handle error
      console.log(e);
    }
  };

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
      const response = await fetch(`${BUSINESS_SERVER_ENDPOINT}/kyc`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(kycFields[type]),
      });

      const json = await response.json();

      console.log(">>> json: ", json);
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
          value={kycFields.withdraw?.amount || ""}
          onChange={handleChangeValue}
          required
        />
        <Input
          label="First name"
          id="name"
          name="name"
          value={kycFields.withdraw?.name || ""}
          onChange={handleChangeValue}
          required
        />
        <Input
          label="Last name"
          id="surname"
          name="surname"
          value={kycFields.withdraw?.surname || ""}
          onChange={handleChangeValue}
          required
        />
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          value={kycFields.withdraw?.email || ""}
          onChange={handleChangeValue}
          required
        />
        <Input
          label="Bank"
          id="bank"
          name="bank"
          value={kycFields.withdraw?.bank || ""}
          onChange={handleChangeValue}
          required
        />
        <Input
          label="Account"
          id="account"
          name="account"
          value={kycFields.withdraw?.account || ""}
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
      {type === "withdraw" ? renderWithdrawFields() : null}
      <Button type="submit">Submit</Button>
    </form>
  );
};
