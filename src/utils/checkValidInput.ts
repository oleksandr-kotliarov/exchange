const regExp = /(^[1-9])\d*\.{0,1}\d*/;

export const checkValidInput: (v: string) => boolean = (input) => {
  const match = input.match(regExp);

  if (Array.isArray(match)) {
    return match[0] === input;
  }

  return false;
};
