import { handleExit } from "./modules/handleExit.js";
import { initReadline } from "./modules/initReadline.js";
import { movesUpOneDirectory } from "./modules/navigation/movesUpOneDirectory.js";
import { changeToSpecifiedDirectory } from "./modules/navigation/changeToSpecifiedDirectory.js";

const cmdActions = {
  ".exit": handleExit,
  up: movesUpOneDirectory,
};

const app = () => {
  const { readLine, startApp, processStatus, handleIncorrectCommand } = initReadline();

  startApp();

  readLine.on("line", (line) => {
    const lineCommandWithoutWhitespaces = line.trim();

    handleIncorrectCommand(lineCommandWithoutWhitespaces);

    let commandStatus;

    if (lineCommandWithoutWhitespaces in cmdActions) {
      commandStatus = cmdActions[lineCommandWithoutWhitespaces]();
    }

    if (lineCommandWithoutWhitespaces === "cd") {
      changeToSpecifiedDirectory("test");
    }

    processStatus(commandStatus);
  });

  readLine.on("SIGINT", () => {
    handleExit();
  });
};

app();
