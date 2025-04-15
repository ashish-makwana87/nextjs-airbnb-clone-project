import AmenitiesInput from "@/components/form/AmenitiesInput";
import { SubmitButton } from "@/components/form/Buttons";
import CategoriesInput from "@/components/form/CategoriesInput";
import CounterInput from "@/components/form/CounterInput";
import CountriesInput from "@/components/form/CountriesInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import UpdatePropertyImage from "@/components/properties/UpdatePropertyImage";
import { Separator } from "@/components/ui/separator";
import { fetchRentalDetails, updatePropertyAction } from "@/utils/actions";
import { type Amenity } from "@/utils/newAmenities";
import Image from "next/image";
import { redirect } from "next/navigation";

async function EditRentalPage({ params }: { params: { id: string } }) {
  const rental = await fetchRentalDetails(params.id);
  if (!rental) redirect("/");

  const existingAmenities: Amenity[] = JSON.parse(rental.amenities);

  return (
    <section className='alignment my-10 md:my-20'>
      <h2 className='head-3 capitalize mb-4 md:mb-8'>Edit Property Info</h2>
      <div className='border p-4 md:p-6 rounded'>
        <Image
          src={rental.image}
          alt={rental.name}
          width={1000}
          height={1000}
          className='w-20 h-20 md:w-28 md:h-28 rounded object-cover'
        />
        <div className='mt-4'>
          <UpdatePropertyImage propertyId={params.id} />
        </div>
        <Separator className='mt-6' />
        <div className='mt-4'>
          <h4 className='head-4 capitalize mb-4'>update property details</h4>
          <FormContainer action={updatePropertyAction}>
            <input type="hidden" name="id" value={rental.id}/>
            <div className='grid md:grid-cols-2 gap-x-4 gap-y-2 md:gap-y-1'>
              <FormInput
                type='text'
                name='name'
                defaultValue={rental.name}
                label='Name (limit: 20 char)'
              />
              <FormInput
                type='text'
                name='tagline'
                defaultValue={rental.tagline}
                label='Tagline (limit: 30 char)'
              />
              <CountriesInput defaultValue={rental.country} />
              <PriceInput defaultValue={rental.price} />
              <CategoriesInput defaultValue={rental.category} />
            </div>
            <div className='mt-2'>
              <TextAreaInput
                name='description'
                label='description (10-100 words)'
                defaultValue={rental.description}
              />
            </div>
            <div className='mt-4 md:mt-6'>
              <h2 className='head-4 mb-4'>Accommodation details</h2>
              <CounterInput detail='guests' defaultValue={rental.guests} />
              <CounterInput detail='bedrooms' defaultValue={rental.bedrooms} />
              <CounterInput detail='beds' defaultValue={rental.beds} />
              <CounterInput detail='baths' defaultValue={rental.baths} />
            </div>
            <div className='mt-4 md:mt-6'>
              <h2 className='head-4 mb-4'>Amenities</h2>
              <AmenitiesInput defaultValue={existingAmenities} />
            </div>
            <SubmitButton text='update property' className='mt-6 md:mt-8' />
          </FormContainer>
        </div>
      </div>
    </section>
  );
}

export default EditRentalPage;
