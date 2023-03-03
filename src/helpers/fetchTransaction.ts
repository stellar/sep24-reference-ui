import { BUSINESS_SERVER_ENDPOINT } from "App";

export const fetchTransaction = async (sToken: string) => {
  try {
    const response = await fetch(`${BUSINESS_SERVER_ENDPOINT}/transaction`, {
      headers: {
        Authorization: `Bearer ${sToken}`,
      },
    });

    const txn = await response.json();
    return txn;
  } catch (e: any) {
    // TODO: handle error
    console.log(e);
  }
};
