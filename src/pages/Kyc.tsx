import { Input, Button } from "@stellar/design-system";
import { BUSINESS_SERVER_ENDPOINT } from "App";
import { useEffect, useState } from "react";

export const Kyc = ({ sessionToken }: { sessionToken: string }) => {
  type KycFields = {
    name: string;
    surname: string;
    email: string;
  };

  // TODO: remove default values
  const [kycFields, setKycFields] = useState<KycFields>({
    name: "Test",
    surname: "Tester",
    email: "test@test.com",
  });

  useEffect(() => {
    fetchTransaction();
  }, [sessionToken]);

  const fetchTransaction = async () => {
    try {
      // TODO: deposit or withdraw?
      const response = await fetch(`${BUSINESS_SERVER_ENDPOINT}/transaction`, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const json = await response.json();

      console.log(">>> response: ", json);
    } catch (e: any) {
      // TODO: handle error
      console.log(e);
    }
  };

  // TODO: update any type
  const handleChangeValue = (e: any) => {
    setKycFields((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // TODO: update any type
  const handleSubmitKyc = async (e: any) => {
    e.preventDefault();
    // TODO:
  };

  return (
    <form className="FormContainer" onSubmit={handleSubmitKyc}>
      <Input
        label="First name"
        id="name"
        name="name"
        value={kycFields.name}
        onChange={handleChangeValue}
        required
      />
      <Input
        label="Last name"
        id="surname"
        name="surname"
        value={kycFields.surname}
        onChange={handleChangeValue}
        required
      />
      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        value={kycFields.email}
        onChange={handleChangeValue}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
