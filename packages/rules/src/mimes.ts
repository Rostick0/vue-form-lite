type typeArgumentMines = string | Array<string>;

const isMimesString = (mimes: typeArgumentMines) => typeof mimes === "string";

const checkMimes = (mimes: typeArgumentMines, mineFile?: string) =>
  isMimesString(mimes)
    ? mimes === mineFile
    : mimes.includes(mineFile as string);

/**
 * @description This function check type files in input value
 * @param {string} mimes Type file
 */
export default (mimes: typeArgumentMines) => (val: FileList, field: string) => {
  for (let i = 0; i < val.length; i++) {
    const file = val[i];
    if (!checkMimes(mimes, file?.type)) {
      return `The ${field} must be a file of ${
        isMimesString(mimes) ? mimes : mimes?.join(", ")
      } - '${file?.name}'`;
    }
  }

  return true;
};

// * @returns {number}
