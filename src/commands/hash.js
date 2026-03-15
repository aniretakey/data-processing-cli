import { parseHashArgs } from "../utils/argParser.js";
import { COMMAND_RESULT } from "../utils/const.js";
import { createHash } from "crypto";
import { pipeline } from "stream/promises";
import { createReadStream } from "fs";
import { writeFile } from "fs/promises";
import { resolveAndCheckFileExists } from "../utils/pathResolver.js";
import { getCurrentWorkingDirectory } from "../utils/state.js";
import { resolve } from "path";

const supportedAlgorithms = ["sha256", "md5", "sha512"];

// TODO: for test:
//  cd E:\dev\Rolling Scopes School\RSS-Node\data-processing-cli\src
//  hash --input text.txt --algorithm md5 --save

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
  if (!filePath) return COMMAND_RESULT.ERROR;

  try {
    const hashStream = createHash(algorithm);

    let resHash = "";
    hashStream.setEncoding("hex");
    hashStream.on("data", (chunk) => (resHash += chunk));

    await pipeline(createReadStream(filePath), hashStream);

    console.log(`${algorithm}: ${resHash}`);

    if (save) {
      const newFileName = `${file}.${algorithm}`;
      const cwd = getCurrentWorkingDirectory();
      const hashFilePath = resolve(cwd, newFileName);

      await writeFile(hashFilePath, resHash);
    }

    return COMMAND_RESULT.SUCCESS;
  } catch {
    return COMMAND_RESULT.ERROR;
  }
};
