import { resolve } from "path";
import { promises as fs } from "fs";

type GetCertificatesResult = {
  signerCert: string | Buffer;
  signerKey: string | Buffer;
  wwdr: string | Buffer;
  signerKeyPassphrase?: string;
};

/**
 * return all needed certificates to create the wallet
 * if you need help to create those certificate can follow this guide:
 * https://github.com/alexandercerutti/passkit-generator/wiki/Generating-Certificates#generate-certificates-through-terminal
 */

const getCertificates = async (): Promise<GetCertificatesResult> => {
  let signerCert: string = "";
  let signerKey: string = "";
  let wwdr: string = "";
  let signerKeyPassphrase: string = "assa1234";

  if (process.env.IS_OFFLINE) {
    [signerCert, signerKey, wwdr] = await Promise.all([
      fs.readFile(
        resolve(__dirname, "../../", "certificates/signerCert.pem"),
        "utf-8"
      ),
      fs.readFile(
        resolve(__dirname, "../../", "certificates/signerKey.pem"),
        "utf-8"
      ),
      fs.readFile(
        resolve(__dirname, "../../", "certificates/WWDR.pem"),
        "utf-8"
      ),
    ]);
  }

  return {
    signerCert,
    signerKey,
    wwdr,
    signerKeyPassphrase,
  };
};

export default getCertificates;
