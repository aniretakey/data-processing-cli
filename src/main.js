import { handleExit } from "./modules/handleExit.js";
import { initReadline } from "./modules/initReadline.js";
import { movesUpOneDirectory } from "./modules/navigation/movesUpOneDirectory.js";
import { COMMAND_RESULT } from "./const/const.js";
import { changeToSpecifiedDirectory } from "./modules/navigation/changeToSpecifiedDirectory.js";

const cmdActions = {
  ".exit": handleExit,
  up: movesUpOneDirectory,
};

const allowedCommandsList = [
  ".exit",
  "up",
  "cd",
  // "ls",
  // "csv-to-json",
  // "json-to-csv",
  // "count",
  // "hash",
  // "encrypt",
  // "decrypt",
  // "log-stats",
  // "hash-compare",
];

const app = () => {
  const { readLine, startApp, addPrompt, handleSuccessCommand, handleIncorrectCommand, handleFailedCommand } =
    initReadline();

  startApp();

  readLine.on("line", (line) => {
    const lineCommandWithoutWhitespaces = line.trim();

    if (!allowedCommandsList.includes(lineCommandWithoutWhitespaces)) {
      handleIncorrectCommand();
    }

    let commandStatus;

    if (lineCommandWithoutWhitespaces in cmdActions) {
      commandStatus = cmdActions[lineCommandWithoutWhitespaces]();
    }
    if (lineCommandWithoutWhitespaces === "cd") {
      changeToSpecifiedDirectory("test");
    }

    if (commandStatus === COMMAND_RESULT.NOTHING) {
      addPrompt();
    }

    if (commandStatus === COMMAND_RESULT.SUCCESS) {
      handleSuccessCommand();
    }

    if (commandStatus === COMMAND_RESULT.ERROR) {
      handleFailedCommand();
    }
  });

  readLine.on("SIGINT", () => {
    handleExit();
  });
};

app();
