let appCurrentDir = process.cwd();

export const getCurrentWorkingDirectory = () => appCurrentDir;
export const setCurrentWorkingDirectory = (newDir) => {
  appCurrentDir = newDir;
};
