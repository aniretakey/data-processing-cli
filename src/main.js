import readline from "readline";

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
    readLine.prompt();
  });

  readLine.on("SIGINT", () => {
    console.log("Thank you for using Data Processing CLI!");
    process.exit();
  });
};

app();
