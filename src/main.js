import { handleExit } from "./modules/handleExit.js";
import { initReadline } from "./modules/initReadline.js";
import { movesUpOneDirectory } from "./modules/navigation/movesUpOneDirectory.js";

const cmdActions = {
  ".exit": handleExit,
  up: movesUpOneDirectory,
};

const app = () => {
  const { readLine, startApp, addPrompt, handleSuccessCommand, handleIncorrectCommand, handleFailedCommand } =
    initReadline();

  startApp();

  readLine.on("line", (line) => {
    const lineCommandWithoutWhitespaces = line.trim();

    if (lineCommandWithoutWhitespaces in cmdActions) {
      cmdActions[lineCommandWithoutWhitespaces]();
      handleSuccessCommand();
    } else {
      handleIncorrectCommand();
    }
  });

  readLine.on("SIGINT", () => {
    handleExit();
  });
};

app();
