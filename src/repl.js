import { handleExit } from "./utils/handleExit.js";
import { initReadline } from "./utils/initReadline.js";
import { changeToSpecifiedDirectory, listContentForCurrentDirectory, movesUpOneDirectory } from "./navigation.js";
import { parseInput } from "./utils/argParser.js";
import { getCount } from "./commands/count.js";
import { hash } from "./commands/hash.js";

// TODO: delete later!
//  dir for testing E:\dev\Rolling Scopes School\RSS-Node\data-processing-cli\src

const cmdActions = {
  ".exit": handleExit,
  up: movesUpOneDirectory,
  ls: listContentForCurrentDirectory,
};

export const initRepl = () => {
  const { readLine, startApp, processStatus, handleIncorrectCommand } = initReadline();

  startApp();

  readLine.on("line", async (line) => {
    const { cmd, args, argsParts } = parseInput(line);

    if (!cmd) {
      return;
    }

    handleIncorrectCommand(cmd);

    let commandStatus;

    if (cmd in cmdActions) {
      commandStatus = cmdActions[cmd]();
    }

    if (cmd === "cd") {
      const newPath = args[0];
      commandStatus = changeToSpecifiedDirectory(newPath);
    }

    if (cmd === "count") {
      const inputPath = args[0]?.replace("--input ", "");
      commandStatus = await getCount(inputPath);
    }

    if (cmd === "hash") {
      commandStatus = await hash(argsParts);
    }

    processStatus(commandStatus);
  });

  readLine.on("SIGINT", () => {
    handleExit();
  });
};
