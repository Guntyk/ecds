export const clearArrayFromNulls = (array) =>
  array.filter((item) => item !== null && item !== '' && item !== undefined);
