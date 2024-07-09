import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(relativeTime);
dayjs.extend(duration);

export const calculateDuration = (timeStart: string, timeEnd: string)=>{
    const start = dayjs(timeStart);
    const end = dayjs(timeEnd);
    const diff = dayjs.duration(end.diff(start));
    const hours = diff.hours() ? `${diff.hours()}h`: '' ;
    const minutes = diff.minutes() ? `${diff.minutes()}m` : '';
    const seconds = `${diff.seconds()}s`;
    
    return `${hours} ${minutes} ${seconds}`
  }