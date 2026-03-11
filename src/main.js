import readline from "readline";
import { handleExit } from "./modules/handleExit.js";

const cmdActions = {
  ".exit": handleExit,
};

const app = () => {
  const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  console.log("Welcome to Data Processing CLI!");
  readLine.prompt();

  readLine.on("line", (line) => {
    const lineCommandWithoutWhitespaces = line.trim();
    console.log("input command:", lineCommandWithoutWhitespaces);

    if (lineCommandWithoutWhitespaces in cmdActions) {
      cmdActions[lineCommandWithoutWhitespaces]();
      readLine.prompt();
    } else {
      console.log("Invalid input");
      readLine.prompt();
    }
  });

  readLine.on("SIGINT", () => {
    handleExit();
  });
};

app();
