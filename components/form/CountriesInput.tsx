import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { formattedCountries } from "@/utils/countries";

const name = "country";

function CountriesInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className='mb-3'>
      <Label htmlFor={name} className='capitalize'>
        countries
      </Label>
      <Select
        name={name}
        required
        defaultValue={defaultValue || formattedCountries[0].code}
      >
        <SelectTrigger id={name} className='mt-1'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {formattedCountries.map((item) => {
            return (
              <SelectItem key={item.code} value={item.code}>
                <span className='flex items-center gap-2'>
                  {item.flag} {item.name}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default CountriesInput;
