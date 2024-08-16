export const formatDate = (startDate, endDate = null) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const parseDate = (dateStr) => {
    const datePart = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
    const [year, month, day] = datePart.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const formatSingleDate = (date) => {
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatDateRangeSameMonth = (start, end) => {
    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = months[start.getMonth()];
    const year = start.getFullYear();
    return `${startDay}-${endDay} ${month} ${year}`;
  };

  const formatDateRangeDifferentMonths = (start, end) => {
    const startDay = start.getDate();
    const startMonth = months[start.getMonth()];
    const endDay = end.getDate();
    const endMonth = months[end.getMonth()];
    const year = start.getFullYear();
    return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
  };

  const start = parseDate(startDate);

  if (!endDate) {
    return formatSingleDate(start);
  }

  const end = parseDate(endDate);

  if (start.getMonth() === end.getMonth()) {
    return formatDateRangeSameMonth(start, end);
  } else {
    return formatDateRangeDifferentMonths(start, end);
  }
};
