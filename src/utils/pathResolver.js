import { isAbsolute, resolve } from "node:path";

export const resolvePathFromCwd = (rawPath) => {
  if (!rawPath) {
    return null;
  }

  const cwd = process.cwd();

  if (isAbsolute(rawPath)) {
    return rawPath;
  }

  return resolve(cwd, rawPath);
};
