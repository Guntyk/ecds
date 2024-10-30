export const formatDateTimeToTime = (isoString) => {
  const date = new Date(isoString);
  date.setUTCHours(date.getUTCHours() + 2);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
