export const isChromeOnDesktop = () => {
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isDesktop = !/Mobi|Android/i.test(navigator.userAgent);
  return isChrome && isDesktop;
};
