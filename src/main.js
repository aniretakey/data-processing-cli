import readline from "readline";

const app = () => {
  const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });
};

app();
