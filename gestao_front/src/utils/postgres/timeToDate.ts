import { set } from "date-fns";
/**
 * Converts postgres' time column to valid 
 * javascript Date
 * Time value must follow format: '00:00:00'
 * */
export default function pgTimeToDate(timeStr: string) {
  const splitTimeStr = timeStr.split(":");
  return set(new Date(), {
    hours: Number(splitTimeStr[0]),
    minutes: Number(splitTimeStr[1]),
    seconds: Number(splitTimeStr[2]),
  });
}
