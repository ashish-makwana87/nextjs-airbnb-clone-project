import React from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormInputProps = {
 name: string,
 type: string,
 label?: string,
 defaultValue?: string,
 placeholder?: string
}

function FormInput({name, label, defaultValue = '', type, placeholder}: FormInputProps) {


  return (
   <div className='mb-3'>
   <Label htmlFor={name} className='capitalize'>{label || name}</Label>
   <Input id={name} name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} required className='mt-1' />
   </div>
  )
}

export default FormInput