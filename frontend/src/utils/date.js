const getDate = (date) => {
  return `${date.getDate()}-${date.getMonth()}-${date.getYear() + 1900}`
}

const getDuration = (date1, date2) => {
  const dateIn = Date.parse(date1);
  const dateOut = Date.parse(date2);
  return Math.round((dateOut.toString() - dateIn.toString()) / 86400000)
}

const isValidDates = (checkin, checkout, min, max) => {
  const checkinDate = Date.parse(checkin);
  const checkoutDate = Date.parse(checkout);
  const minDate = Date.parse(min);
  const maxDate = Date.parse(max);
  return (checkinDate >= minDate && checkoutDate < maxDate);
}

export {
  getDate,
  getDuration,
  isValidDates
};
