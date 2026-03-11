import { handleExit } from "./modules/handleExit.js";
import { initReadline } from "./modules/initReadline.js";
import { movesUpOneDirectory } from "./modules/navigation/movesUpOneDirectory.js";
import { COMMAND_RESULT } from "./const/const.js";

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
      const commandStatus = cmdActions[lineCommandWithoutWhitespaces]();

      if (commandStatus === COMMAND_RESULT.NOTHING) {
        addPrompt();
      }

      if (commandStatus === COMMAND_RESULT.SUCCESS) {
        handleSuccessCommand();
      }

      if (commandStatus === COMMAND_RESULT.ERROR) {
        handleFailedCommand();
      }
    } else {
      handleIncorrectCommand();
    }
  });

  readLine.on("SIGINT", () => {
    handleExit();
  });
};

app();
