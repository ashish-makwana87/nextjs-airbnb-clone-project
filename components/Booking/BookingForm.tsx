'use client';
import { calculateTotals } from "@/utils/calculateTotals";
import { formatCurrency } from "@/utils/format";
import { useProperty } from "@/utils/store";
import { Card, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";


function BookingForm() {
 
  const {range, price} = useProperty((state) => state);
  
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  const { totalNights, subTotal, cleaning, service, taxes, orderTotal } = calculateTotals({checkIn, checkOut, price})
  

  return (
    <div className="border rounded p-6 w-full mb-4">
      <h4 className="mb-4 font-semibold">Summary</h4>
      <FormRow label={`$${price} x ${totalNights} nights`} price={subTotal} />
      <FormRow label='cleaning' price={cleaning} />
      <FormRow label='service' price={service} />
      <FormRow label='taxes' price={taxes} />
      <Separator className="my-4" />
      <FormRow label='order total' price={orderTotal} className="font-semibold" />
    </div>
  )
}


function FormRow({label, price, className}:{label:string, price: number, className?: string}) {
 
 return <div className="flex justify-between items-center mb-2">
  <h6 className={`text-sm capitalize ${className}`}>{label}</h6>
  <h6 className={`text-sm capitalize ${className}`}>{formatCurrency(price)}</h6>
 </div>
}

export default BookingForm