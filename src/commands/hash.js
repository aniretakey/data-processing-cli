import { parseHashArgs } from "../utils/argParser.js";
import { COMMAND_RESULT } from "../utils/const.js";

const supportedAlgorithms = ["sha256", "md5", "sha512"];

export const hash = async (args) => {
  const { file, algorithm, save } = parseHashArgs(args);

  console.log("file", file);
  console.log("algorithm", algorithm);
  console.log("save", save);

  if (!supportedAlgorithms.includes(algorithm)) {
    console.log(`Selected algorithm ${algorithm} doesn't support!`);
    return COMMAND_RESULT.ERROR;
  }

  return COMMAND_RESULT.NOTHING;
};
