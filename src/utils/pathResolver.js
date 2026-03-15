import { isAbsolute, resolve } from "path";
import { getCurrentWorkingDirectory } from "./state.js";
import { statSync } from "fs";

export const resolvePathFromCwd = (rawPath) => {
  if (!rawPath) return null;

  const cwd = getCurrentWorkingDirectory();

  return isAbsolute(rawPath) ? rawPath : resolve(cwd, rawPath);
};

export const resolveAndCheckFileExists = (rawPath) => {
  const resolvedPath = resolvePathFromCwd(rawPath);
  if (!resolvedPath) return null;

  try {
    const stats = statSync(resolvedPath);
    if (!stats.isFile()) {
      console.log("Operation failed");
      return null;
    }
    return resolvedPath;
  } catch {
    console.log("Operation failed");
    return null;
  }
};

export const resolveAndCheckDirectoryExists = (rawPath) => {
  const resolvedPath = resolvePathFromCwd(rawPath);
  if (!resolvedPath) return null;

  try {
    const stats = statSync(resolvedPath);
    if (!stats.isDirectory()) {
      console.log("Operation failed");
      return null;
    }
    return resolvedPath;
  } catch {
    console.log("Operation failed");
    return null;
  }
};
