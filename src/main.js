import { handleExit } from "./modules/handleExit.js";
import { initReadline } from "./modules/initReadline.js";
import { changeToSpecifiedDirectory, listContentForCurrentDirectory, movesUpOneDirectory } from "./navigation.js";

const cmdActions = {
  ".exit": handleExit,
  up: movesUpOneDirectory,
  ls: listContentForCurrentDirectory,
};

const app = () => {
  const { readLine, startApp, processStatus, handleIncorrectCommand } = initReadline();

  startApp();

  readLine.on("line", (line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return;
    }

    const [cmd, ...args] = trimmed.split(/\s+/);

    handleIncorrectCommand(cmd);

    let commandStatus;

    if (cmd in cmdActions) {
      commandStatus = cmdActions[cmd]();
    }

    if (cmd === "cd") {
      const newPath = args.join(" ");
      commandStatus = changeToSpecifiedDirectory(newPath);
    }

    processStatus(commandStatus);
  });

  readLine.on("SIGINT", () => {
    handleExit();
  });
};

app();
