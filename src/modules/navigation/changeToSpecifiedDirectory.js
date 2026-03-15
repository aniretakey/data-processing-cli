import { isAbsolute, resolve } from "path";
import { statSync } from "fs";
import { COMMAND_RESULT } from "../../const/const.js";

export const changeToSpecifiedDirectory = (newPath) => {
  if (!newPath) {
    console.log("Path to directory not passed!");
    return COMMAND_RESULT.ERROR;
  }

  const currentWorkingDir = process.cwd();

  let finalPath;

  if (isAbsolute(newPath)) {
    finalPath = newPath;
    console.log("absolute!");
  } else {
    const resolvedPath = resolve(currentWorkingDir, newPath);
    finalPath = resolvedPath;
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
