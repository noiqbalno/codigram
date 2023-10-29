import { formatDistanceToNow, parseISO } from 'date-fns';

export const formatTimeAgo = (timestamp) => {
  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return timeAgo;
};
