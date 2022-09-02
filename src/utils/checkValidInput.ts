const regExp = /(^[1-9])\d*\.{0,1}\d*/;

export const checkValidInput: (v: string) => boolean = (input) => (
  regExp.test(input) && input.split('.').length <= 2
);
