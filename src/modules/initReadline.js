import readline from "readline";

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

  const handleIncorrectInput = () => {
    console.log("Invalid input");
    addPrompt();
  };

  return { readLine, startApp, addPrompt, handleIncorrectInput };
};
