import { createPkpass } from "../services";

const pkpass = async () => {
  const pkpass64 = await createPkpass();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Wallet created",
      data: pkpass64,
    }),
  };
};

export default pkpass;
