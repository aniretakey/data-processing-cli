import readline from "readline";
import { getCurrentWorkingDirectory } from "./getCurrentWorkingDirectory.js";
import { COMMAND_RESULT } from "../const/const.js";

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

export const initReadline = () => {
  const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  const addPrompt = () => readLine.prompt();

  const printCurrDirectory = () => {
    const currDir = getCurrentWorkingDirectory();
    console.log(`You are currently in ${currDir}`);
  };

  const handleSuccessCommand = () => {
    printCurrDirectory();
    addPrompt();
  };

  const startApp = () => {
    console.log("Welcome to Data Processing CLI!");
    handleSuccessCommand();
  };

  const handleIncorrectCommand = (newCommand) => {
    if (!allowedCommandsList.includes(newCommand)) {
      console.log("Invalid input");
      addPrompt();
    }
  };

  const handleFailedCommand = () => {
    console.log("Operation failed");
    addPrompt();
  };

  const processStatus = (status) => {
    if (status === COMMAND_RESULT.NOTHING) {
      addPrompt();
    }

    if (status === COMMAND_RESULT.SUCCESS) {
      handleSuccessCommand();
    }

    if (status === COMMAND_RESULT.ERROR) {
      handleFailedCommand();
    }
  };

  return {
    readLine,
    startApp,
    addPrompt,
    handleSuccessCommand,
    handleIncorrectCommand,
    handleFailedCommand,
    processStatus,
  };
};
