import { handleExit } from "./modules/handleExit.js";
import { initReadline } from "./modules/initReadline.js";

const cmdActions = {
  ".exit": handleExit,
};

const app = () => {
  const { readLine, startApp, addPrompt, handleIncorrectInput } = initReadline();

  startApp();

  readLine.on("line", (line) => {
    const lineCommandWithoutWhitespaces = line.trim();
    console.log("input command:", lineCommandWithoutWhitespaces);

    if (lineCommandWithoutWhitespaces in cmdActions) {
      cmdActions[lineCommandWithoutWhitespaces]();
      addPrompt();
    } else {
      handleIncorrectInput();
    }
  });

  readLine.on("SIGINT", () => {
    handleExit();
  });
};

app();
