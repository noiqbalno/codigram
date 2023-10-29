import { isValid, format, parseISO } from 'date-fns';

export const formatDate = (utcDate) => {
  if (!utcDate) {
    return 'Invalid Date';
  }

  const parsedDate = parseISO(utcDate);
  const isValidDate = isValid(parsedDate);
  if (isValidDate) {
    // parsedDate is a `Date` object, so you can use it directly,
    // instead of `new Date(utcDate)`
    const messageDate = format(parsedDate, 'PPP');
    return messageDate;
  } else {
    return 'InvalidDate';
  }
};
