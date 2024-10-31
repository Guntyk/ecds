export const generateMediaURL = (url) => {
  if (url) {
    console.log(url);
    return process.env.PRODUCTION === 'true' ? url : `${process.env.REACT_APP_BASE_API_URL}${url}`;
  } else {
    return null;
  }
};
