import { readdirSync, statSync } from "fs";
import { COMMAND_RESULT } from "../../const/const.js";
import { resolve } from "node:path";

const logItem = (item) => {
  console.log(item);
};

export const listContentForCurrentDirectory = () => {
  const currentDir = process.cwd();

  const list = readdirSync(currentDir);

  const files = [];
  const folders = [];

  list.forEach((item) => {
    const pathToElem = resolve(currentDir, item);
    const stat = statSync(pathToElem);

    if (stat.isDirectory()) {
      folders.push(`${item} [folder]`);
    } else {
      files.push(`${item} [file]`);
    }
  });

  folders.sort((a, b) => a.localeCompare(b)).forEach(logItem);
  files.sort((a, b) => a.localeCompare(b)).forEach(logItem);

  return COMMAND_RESULT.NOTHING;
};
