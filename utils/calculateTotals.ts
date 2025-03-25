import { calculateDaysBetween } from "./calendar";

export const calculateTotals = ({
  checkIn,
  checkOut,
  price,
}: {
  checkIn: Date;
  checkOut: Date;
  price: number;
}) => {
  const totalNights = calculateDaysBetween({ checkIn, checkOut });
  const subTotal = totalNights * price;
  const cleaning = 20;
  const service = 15;
  const taxes = subTotal * 0.1;

  const orderTotal = subTotal + cleaning + service + taxes;

  return { totalNights, subTotal, cleaning, service, taxes, orderTotal };
};
