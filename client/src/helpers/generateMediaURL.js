export const generateMediaURL = (url) => {
  if (url) {
    return process.env.REACT_APP_PRODUCTION === 'false' ? url : `${process.env.REACT_APP_BASE_API_URL}${url}`;
  } else {
    return null;
  }
};
