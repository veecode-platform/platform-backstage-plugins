/* eslint-disable no-console */
export const truncateString = (str: string, maxLength: number) => {

  const treatedString = str.trim();

  // If it is a string made up of more than one word, return only the first word
  if (treatedString.includes(' ')) {
    const words: string[] = treatedString.split(' ');
    const word: string = words[0];
    return word;
  }
  if (treatedString.length > maxLength) {
    return `${treatedString.slice(0, maxLength)}  ...`  // If it is a string that exceeds the character limit entered in the function parameter
  }

  return treatedString;
};