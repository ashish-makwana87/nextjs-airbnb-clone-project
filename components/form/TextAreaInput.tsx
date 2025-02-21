import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '../ui/textarea';

type TextAreaProps = {
 name: string,
 defaultValue?: string
 label: string
}


function TextAreaInput({name, label, defaultValue}: TextAreaProps) {

  return (
    <div className='mb-3'>
    <Label htmlFor={name} className='capitalize'>{label}</Label>
    <Textarea rows={5} id={name} name={name} required className='mt-1 text-sm md:text-base' />
    </div>
  )
}

export default TextAreaInput;