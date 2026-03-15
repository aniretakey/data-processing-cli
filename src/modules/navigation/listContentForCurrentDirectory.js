import { readdirSync } from "fs";

export const listContentForCurrentDirectory = () => {
  const currentDir = process.cwd();

  const list = readdirSync(currentDir);
  console.log("list:", list);
};
