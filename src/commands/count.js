import { pipeline } from "stream/promises";
import { createReadStream } from "fs";
import { resolveAndCheckFileExists } from "../utils/pathResolver.js";
import { COMMAND_RESULT } from "../utils/const.js";
import { Transform } from "stream";

const createCountTransform = () => {
  let lines = 0,
    words = 0,
    chars = 0;

  return new Transform({
    transform(chunk, encoding, callback) {
      const text = chunk.toString();

      lines += (text.match(/\r?\n/g) || []).length;
      chars += text.length;

      const wordMatches = text.trim().match(/\S+/g);
      words += wordMatches ? wordMatches.length : 0;

      callback();
    },

    flush(callback) {
      console.log(`Lines: ${lines}`);
      console.log(`Words: ${words}`);
      console.log(`Characters: ${chars}`);
      callback();
    },
  });
};

export const getCount = async (inputPath) => {
  const filePath = resolveAndCheckFileExists(inputPath);
  
  if (!filePath) {
    return COMMAND_RESULT.ERROR;
  }

  try {
    await pipeline(createReadStream(filePath), createCountTransform());
    return COMMAND_RESULT.SUCCESS;
  } catch {
    return COMMAND_RESULT.ERROR;
  }
};
