import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { categories } from "@/utils/categories";

const name = "category";

function CategoriesInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className='mb-3'>
      <Label htmlFor={name} className='capitalize'>
        categories
      </Label>
      <Select name={name} required defaultValue={defaultValue || categories[0].label}>
      <SelectTrigger id={name} className="mt-1">
       <SelectValue />
      </SelectTrigger>
      <SelectContent>
       {categories.map((item) => {
        return <SelectItem key={item.label} value={item.label}><span className="flex items-center gap-x-2"><item.icon />{item.label}</span></SelectItem>
       })}
      </SelectContent>
      </Select>
    </div>
  );
}

export default CategoriesInput;
