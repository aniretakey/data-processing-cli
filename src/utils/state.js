import os from "os";

let appCurrentDir = os.homedir();

export const getCurrentWorkingDirectory = () => appCurrentDir;
export const setCurrentWorkingDirectory = (newDir) => {
  appCurrentDir = newDir;
};
