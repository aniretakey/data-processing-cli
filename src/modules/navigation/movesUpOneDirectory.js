import { resolve } from "node:path";

export const movesUpOneDirectory = () => {
  const currentDir = process.cwd();
  const upperDir = resolve(currentDir, "..");

  if (currentDir === upperDir) {
    console.log(`Already in root directory!`);
    return;
  }

  process.chdir(upperDir);
};
