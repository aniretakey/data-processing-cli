import { parseHashCompareArgs } from "../utils/argParser.js";
import { COMMAND_RESULT } from "../utils/const.js";

// TODO: commands for test
// cd E:\dev\Rolling Scopes School\RSS-Node\data-processing-cli\src
// hash-compare --input text.txt --hash text.txt.sha256  --algorithm md5

export const hashCompare = async (args) => {
  const { file, hashFile, algorithm } = parseHashCompareArgs(args);

  console.log("file", file);
  console.log("hashFile", hashFile);
  console.log("algorithm", algorithm);

  return COMMAND_RESULT.SUCCESS;
};
