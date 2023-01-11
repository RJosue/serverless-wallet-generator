import { PKPass } from "passkit-generator";
import { getCertificates, getItems } from "../utils";

const createPkpass = async () => {
  const [certificates, icon, icon2x, logo, logo2x] = await Promise.all([
    /** This function the 3 certificates needed to create the wallet */
    getCertificates(),
    getItems({ folderName: "LocalCarnet.pass", itemName: "icon.png" }),
    getItems({ folderName: "LocalCarnet.pass", itemName: "icon@2x.png" }),
    getItems({ folderName: "LocalCarnet.pass", itemName: "logo.png" }),
    getItems({ folderName: "LocalCarnet.pass", itemName: "logo@2x.png" }),
  ]);

  const pass = new PKPass({}, certificates, {
    // Wallet description used for voice over iOS
    description: "Assa Salud Carnet",
    // This is the Pass Type generated from https://developer.apple.com/account/resources/identifiers/list/passTypeId
    passTypeIdentifier: "pass.com.assanet.movil",
    // This serial number must be unique by wallet
    serialNumber: `nmyuxofgna${Math.random()}`,
    organizationName: "Assa",
    // Apple Team ID
    teamIdentifier: "9VBEVQ5X89",
    foregroundColor: "rgb(255, 255, 255)",
    backgroundColor: "rgb(23, 73, 160)",
    labelColor: "rgb(255, 255, 255)",
  });
  /**
   * This value represent the type of wallet we want to created
   * - generic
   * - boardingPass
   * - coupon
   * - eventTicket
   * - storeCard
   *
   * for more check this https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html
   */
  pass.type = "generic";

  /**
   * An object that represents the fields that display the most important information on the front of a pass.
   * !IMPORTANT: every key must be unique
   * for more check this https://developer.apple.com/documentation/walletpasses/passfields/primaryfields
   */
  pass.primaryFields.push({
    key: "user",
    label: "Raul Gomez",
    value: "ASSACare Anual Renovable",
  });

  /**
   * An object that represents the fields that display additional information on the front of a pass.
   * !IMPORTANT: every key must be unique
   * for more check this https://developer.apple.com/documentation/walletpasses/passfields/auxiliaryfields
   */
  pass.auxiliaryFields.push(
    {
      key: "policies",
      label: "Póliza",
      value: "70BC1-1969",
    },
    {
      key: "effectiveDate",
      label: "Efectivo desde",
      value: "15 / 11 / 2022",
    }
  );

  /**
   * An object that represents the fields that display information on the back of a pass.
   * !IMPORTANT: every key must be unique
   * for more check this https://developer.apple.com/documentation/walletpasses/passfields/backfields
   */
  pass.backFields.push(
    {
      label: "Datos Personales",
      key: "personalData",
      value: "",
    },
    {
      label: "Nombre",
      key: "name",
      value: "Alessandro Gabriel Presutti Ribeiro",
    },
    {
      label: "Póliza",
      key: "policy",
      value: "70BC1-1969",
    },
    {
      label: "Plan",
      key: "plan",
      value: "70BC1-1969",
    },
    {
      label: "Contratante",
      key: "owner",
      value: "ASSA COMPAÑIA DE SEGUROS, S.A.",
    },
    {
      label: "Beneficios",
      key: "benefices",
      value: "CO-PAGO/DEDUCIBLE",
    },
    {
      label: "Coberturas",
      key: "cover",
      value: "",
    },
    {
      label: "Gastos Ambulatorios",
      key: "expenses",
      value:
        "Laboratorios e imagenología: 20% del costo total si utiliza proveedores de la red.",
    },
    {
      label: "Beneficios de hospital",
      key: "medicalBenefices",
      value:
        "$50.00 diario (max. 5 días) al 100%. Coaseguro 20% después de 12 días de hospitalización",
    },
    {
      label: "Urgencias por accidentes",
      key: "key2",
      value:
        "100% de copago. Honorarios médicos 100% máximo B/.1,000.00 por evento.",
    },
    {
      label: "Urgencias por enfermedad",
      key: "key3",
      value:
        "Critica detallada: B/.20.00, 100% cobertura. Honorarios médicos al 90%. Critica no detallada: B/.50.00 por evento Honorarios médicos al 90%",
    },
    {
      label: "Honorarios médicos",
      key: "key3",
      value:
        "Cuidados primarios: B/.5.00 Especialista: B/.10.00 Control niño sano: B/. 15.00",
    },
    {
      label: "Cirugía ambulatoria",
      key: "key4",
      value: "100% copago B/.50.00 por evento. En consultorio: al 80%",
    },
    {
      label: "Recomendación",
      key: "key5",
      value:
        "Toda hospitalización, cirugía, tratamiento, estudio o examen especializado requiere pre-autorización y/o segunda opinión. Para consultas llámenos al 300-2424",
    }
  );

  /** Add QR to wallet */
  pass.setBarcodes({
    /** This is the values of the QR */
    message: "123456789",
    /** Format of the barcode for this example we use QR but exist more:
     * - PKBarcodeFormatPDF417
     * - PKBarcodeFormatAztec
     * - PKBarcodeFormatCode128
     *
     * for more check this https://developer.apple.com/documentation/walletpasses/pass/barcodes
     */
    format: "PKBarcodeFormatQR",
    messageEncoding: "iso-8859-1",
  });

  /**
   * Required by Apple. If one is not available, a
   * pass might be openable on a Mac but not on a
   * specific iPhone model
   */

  pass.addBuffer("icon.png", icon);
  pass.addBuffer("icon@2x.png", icon2x);
  pass.addBuffer("logo.png", logo);
  pass.addBuffer("logo@2x.png", logo2x);

  return pass.getAsBuffer().toString("base64");
};

export default createPkpass;
