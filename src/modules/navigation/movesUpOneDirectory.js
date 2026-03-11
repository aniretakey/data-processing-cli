import { resolve } from "node:path";
import { COMMAND_RESULT } from "../../const/const.js";

export const movesUpOneDirectory = () => {
  const currentDir = process.cwd();
  const upperDir = resolve(currentDir, "..");

  if (currentDir === upperDir) {
    return COMMAND_RESULT.NOTHING;
  }

  process.chdir(upperDir);

  return COMMAND_RESULT.SUCCESS;
};
