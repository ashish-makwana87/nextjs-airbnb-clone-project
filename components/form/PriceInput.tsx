import { Input } from "../ui/input";
import { Label } from "../ui/label";

type PriceProps = {
 defaultValue? : number
}

function PriceInput({defaultValue}: PriceProps) {

 const name = 'price';
 
  return (
    <div className="mb-2 md:mb-4">
     <Label htmlFor={name}>Price ($)</Label>
     <Input type="number" name={name} id={name} min={0} defaultValue={defaultValue || 50} required className="mt-1 text-sm" />
    </div>
  )
}

export default PriceInput