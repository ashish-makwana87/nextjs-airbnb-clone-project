import { calculateDaysBetween } from "./calendar"




export const calculateTotals = ({checkIn, checkOut, price} : {checkIn: Date, checkOut: Date, price: number}) => {

   
 const totalNights = calculateDaysBetween({checkIn, checkOut})
 


 return {totalNights}

}