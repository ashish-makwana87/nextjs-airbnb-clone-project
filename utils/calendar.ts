import { DateRange } from "react-day-picker";

export const defaultSelected: DateRange = {
 from: undefined,
 to: undefined
}

export const calculateDaysBetween = ({checkIn, checkOut}: {checkIn: Date, checkOut: Date}) => {

 // difference in milliseconds

const diffInMs = Math.abs(checkOut.getTime() - checkIn.getTime())

// calculating days based on total milliseconds
const totalDays = diffInMs / (1000 * 60 * 60 * 24)

return totalDays;
}