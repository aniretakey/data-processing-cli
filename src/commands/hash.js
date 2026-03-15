import { parseHashArgs } from "../utils/argParser.js";
import { COMMAND_RESULT } from "../utils/const.js";
import { createHash } from "crypto";
import { Transform } from "stream";
import { pipeline } from "stream/promises";
import { createReadStream } from "fs";
import { resolveAndCheckFileExists } from "../utils/pathResolver.js";

const supportedAlgorithms = ["sha256", "md5", "sha512"];

// TODO: for test: hash --input text.txt --algorithm md5 --save

const createHashTransform = (algorithm) => {
  const hash = createHash(algorithm);

  return new Transform({
    transform(chunk, encoding, callback) {
      hash.update(chunk);
      callback();
    },

    flush(callback) {
      const digest = hash.digest("hex");
      console.log(`${algorithm}: ${digest}`);
      callback(null, digest);
    },
  });
};

export const hash = async (args) => {
  const { file, algorithm, save } = parseHashArgs(args);

  console.log("file", file);
  console.log("algorithm", algorithm);
  console.log("save", save);

  if (!supportedAlgorithms.includes(algorithm)) {
    console.log(`Selected algorithm ${algorithm} doesn't support!`);
    return COMMAND_RESULT.ERROR;
  }

  const filePath = resolveAndCheckFileExists(file);

  await pipeline(createReadStream(filePath), createHashTransform(algorithm));

  return COMMAND_RESULT.NOTHING;
};
