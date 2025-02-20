import { Input } from "../ui/input";
import { Label } from "../ui/label";

type PriceProps = {
 defaultValue? : number
}

function PriceInput({defaultValue}: PriceProps) {

 const name = 'price';
 
  return (
    <div>
     <Label htmlFor={name}>Price ($)</Label>
     <Input type="number" name={name} id={name} min={1} defaultValue={defaultValue || 50} required className="mt-1" />
    </div>
  )
}

export default PriceInput