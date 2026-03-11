import { fileURLToPath } from "url";
import { dirname, parse } from "path";

export const getCurrentWorkingDirectory = () => {
  const __filename = fileURLToPath(import.meta.url, fileURLToPath(import.meta.url));
  const __dirname = dirname(__filename);
  
  return parse(__dirname).dir;
};
