import { handleExit } from "./utils/handleExit.js";
import { initReadline } from "./utils/initReadline.js";
import { changeToSpecifiedDirectory, listContentForCurrentDirectory, movesUpOneDirectory } from "./navigation.js";
import { parseInput } from "./utils/argParser.js";

const cmdActions = {
  ".exit": handleExit,
  up: movesUpOneDirectory,
  ls: listContentForCurrentDirectory,
};

const app = () => {
  const { readLine, startApp, processStatus, handleIncorrectCommand } = initReadline();

  startApp();

  readLine.on("line", (line) => {
    const { cmd, args } = parseInput(line);

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

    processStatus(commandStatus);
  });

  readLine.on("SIGINT", () => {
    handleExit();
  });
};

app();
