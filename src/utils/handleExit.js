import { COMMAND_RESULT } from "../const/const.js";

export const handleExit = () => {
  console.log("Thank you for using Data Processing CLI!");
  process.exit();

  return COMMAND_RESULT.NOTHING;
};
