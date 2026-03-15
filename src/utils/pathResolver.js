import { isAbsolute, resolve } from "node:path";
import { getCurrentWorkingDirectory } from "../navigation.js";

export const resolvePathFromCwd = (rawPath) => {
  if (!rawPath) {
    return null;
  }

  const cwd = getCurrentWorkingDirectory();

  if (isAbsolute(rawPath)) {
    return rawPath;
  }

  return resolve(cwd, rawPath);
};
