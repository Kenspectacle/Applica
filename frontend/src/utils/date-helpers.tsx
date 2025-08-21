import { format, fromUnixTime } from 'date-fns';

export const dbDateToRealDate = (dbDate: string) => {
    return format(fromUnixTime(Number(dbDate)/1000), 'dd-mm-yyyy')
  }