import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

function RatingInput({name, labelText}:{name: string, labelText?: string}) {
  
  const numbers = Array.from({length:5}, (_, i) => { const value = i + 1; 
   
    return value.toString();
  }).reverse();

  return (
    <div className='mb-4'>
     <Label htmlFor={name} className='capitalize' >{labelText || name}</Label>
     <Select defaultValue={numbers[0]} name={name} required>
      <SelectTrigger className='mt-1'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
       {numbers.map((item) => {
        return <SelectItem id={item} value={item}>{item}</SelectItem>
       })} 
      </SelectContent>
      </Select>
    </div>
  )
}

export default RatingInput