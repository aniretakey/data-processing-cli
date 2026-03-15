import { isAbsolute, resolve } from "path";
import { readdirSync, statSync } from "fs";
import { COMMAND_RESULT } from "./const/const.js";

const movesUpOneDirectory = () => {
  const currentDir = process.cwd();
  const upperDir = resolve(currentDir, "..");

  if (currentDir === upperDir) {
    return COMMAND_RESULT.NOTHING;
  }

  process.chdir(upperDir);

  return COMMAND_RESULT.SUCCESS;
};

const changeToSpecifiedDirectory = (newPath) => {
  if (!newPath) {
    console.log("Path to directory not passed!");
    return COMMAND_RESULT.ERROR;
  }

  const currentWorkingDir = process.cwd();

  let finalPath;

  if (isAbsolute(newPath)) {
    finalPath = newPath;
  } else {
    finalPath = resolve(currentWorkingDir, newPath);
  }

  try {
    const stats = statSync(finalPath);

    if (!stats.isDirectory()) {
      return COMMAND_RESULT.ERROR;
    }
    process.chdir(finalPath);
    return COMMAND_RESULT.SUCCESS;
  } catch {
    return COMMAND_RESULT.ERROR;
  }
};

const listContentForCurrentDirectory = () => {
  const logItem = (item) => {
    console.log(item);
  };

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

export { listContentForCurrentDirectory, changeToSpecifiedDirectory, movesUpOneDirectory };
