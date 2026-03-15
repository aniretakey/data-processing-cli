import { parseHashCompareArgs } from "../utils/argParser.js";
import { COMMAND_RESULT } from "../utils/const.js";
import { resolveAndCheckFileExists } from "../utils/pathResolver.js";
import { readFile } from "fs/promises";
import { createHash } from "crypto";
import { createReadStream } from "fs";
import { pipeline } from "stream/promises";

const supportedAlgorithms = ["sha256", "md5", "sha512"];

export const hashCompare = async (args) => {
  const { file, hashFile, algorithm } = parseHashCompareArgs(args);

  if (!supportedAlgorithms.includes(algorithm)) {
    console.log(`Selected algorithm ${algorithm} doesn't support!`);
    return COMMAND_RESULT.ERROR;
  }

  const inputFile = resolveAndCheckFileExists(file);
  const hashFilePath = resolveAndCheckFileExists(hashFile);

  if (!inputFile || !hashFilePath) {
    return COMMAND_RESULT.ERROR;
  }

  const expectedHashRaw = await readFile(hashFilePath, "utf8");
  const expectedHashTrimmed = expectedHashRaw.trim().toLowerCase();

  const hashStream = createHash(algorithm);
  let currentHash = "";
  hashStream.setEncoding("hex");
  hashStream.on("data", (chunk) => (currentHash += chunk));

  await pipeline(createReadStream(inputFile), hashStream);
  currentHash = currentHash.toLowerCase();

  if (currentHash === expectedHashTrimmed) {
    console.log("OK");
  } else {
    console.log("MISMATCH");
  }

  return COMMAND_RESULT.SUCCESS;
};
