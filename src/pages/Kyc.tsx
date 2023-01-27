import { Input, Button } from "@stellar/design-system";
import { useState } from "react";

export const Kyc = ({ jwtToken }: { jwtToken: string }) => {
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

    try {
      // TODO: deposit or withdraw?
      const request = await fetch("http://localhost:8091/start", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const response = await request.json();
      console.log(">>> response: ", response);
    } catch (e: any) {
      console.log(e);
    }
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
