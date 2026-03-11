import readline from "readline";
import { getCurrentWorkingDirectory } from "./getCurrentWorkingDirectory.js";

export const initReadline = () => {
  const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  const addPrompt = () => readLine.prompt();

  const startApp = () => {
    console.log("Welcome to Data Processing CLI!");
    addPrompt();
  };

  const handleSuccessCommand = () => {
    const currDir = getCurrentWorkingDirectory();
    console.log(`You are currently in ${currDir}`);
    addPrompt();
  };

  const handleIncorrectCommand = () => {
    console.log("Invalid input");
    addPrompt();
  };

  const handleFailedCommand = () => {
    console.log("Operation failed");
    addPrompt();
  };

  return { readLine, startApp, addPrompt, handleSuccessCommand, handleIncorrectCommand, handleFailedCommand };
};
