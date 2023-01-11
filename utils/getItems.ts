import { resolve } from "path";
import { promises as fs } from "fs";

type getItemProps = {
  itemName: string;
  folderName: string;
};

/** This function is used to get asset file for the wallet */

const getItem = async ({ itemName, folderName }: getItemProps) => {
  const standardModelName = folderName.endsWith(".pass")
    ? folderName
    : `${folderName}.pass`;

  const folderPath = resolve(
    __dirname,
    "../../",
    `models/${standardModelName}`
  );
  return fs.readFile(resolve(folderPath, itemName));
};

export default getItem;
