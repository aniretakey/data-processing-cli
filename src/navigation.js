import { resolve } from "path";
import { readdirSync, statSync } from "fs";
import { COMMAND_RESULT } from "./utils/const.js";
import { resolvePathFromCwd } from "./utils/pathResolver.js";
import { getCurrentWorkingDirectory, setCurrentWorkingDirectory } from "./utils/state.js";

const movesUpOneDirectory = () => {
  const currentDir = getCurrentWorkingDirectory();
  const upperDir = resolve(currentDir, "..");

  if (currentDir === upperDir) {
    return COMMAND_RESULT.NOTHING;
  }

  setCurrentWorkingDirectory(upperDir);

  return COMMAND_RESULT.SUCCESS;
};

const changeToSpecifiedDirectory = (newPath) => {
  if (!newPath) {
    console.log("Path to directory not passed!");
    return COMMAND_RESULT.ERROR;
  }

  const finalPath = resolvePathFromCwd(newPath);

  try {
    const stats = statSync(finalPath);

    if (!stats.isDirectory()) {
      console.log("Operation failed");
      return COMMAND_RESULT.ERROR;
    }

    setCurrentWorkingDirectory(finalPath);
    return COMMAND_RESULT.SUCCESS;
  } catch {
    return COMMAND_RESULT.ERROR;
  }
};

const listContentForCurrentDirectory = () => {
  const logItem = (item) => console.log(item);
  const currentDir = getCurrentWorkingDirectory();

  try {
    const list = readdirSync(currentDir);

    const files = [],
      folders = [];

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
  } catch {
    return COMMAND_RESULT.ERROR;
  }
};

export { listContentForCurrentDirectory, changeToSpecifiedDirectory, movesUpOneDirectory, setCurrentWorkingDirectory };
