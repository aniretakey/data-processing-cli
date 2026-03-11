import { handleExit } from "./modules/handleExit.js";
import { initReadline } from "./modules/initReadline.js";

const cmdActions = {
  ".exit": handleExit,
};

const app = () => {
  const { readLine, startApp, addPrompt, handleSuccessCommand, handleIncorrectCommand, handleFailedCommand } =
    initReadline();

  startApp();

  readLine.on("line", (line) => {
    const lineCommandWithoutWhitespaces = line.trim();
    console.log("input command:", lineCommandWithoutWhitespaces);

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
