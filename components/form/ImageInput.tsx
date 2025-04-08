import { Label } from '../ui/label'
import { Input } from '../ui/input'


function ImageInput() {

 const name = 'image';

  return (
   <div className='mb-2 md:mb-4'>
    <Label htmlFor={name}>Image</Label>
    <Input id={name} name={name} type='file' required accept='image/*' className='max-w-xs mt-1' />
   </div>
  )
}

export default ImageInput