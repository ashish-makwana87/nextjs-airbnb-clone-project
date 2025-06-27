import AmenitiesInput from "@/components/form/AmenitiesInput";
import { SubmitButton } from "@/components/form/Buttons";
import CategoriesInput from "@/components/form/CategoriesInput";
import CounterInput from "@/components/form/CounterInput";
import CountriesInput from "@/components/form/CountriesInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { createPropertyAction } from "@/utils/actions";

function CreateRentalPage() {
  return (
    <section className='alignment py-10 md:py-20'>
      <h1 className='head-1 capitalize mb-6'>create rental</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={createPropertyAction}>
          <div className='grid md:grid-cols-2 gap-x-4 gap-y-2 md:gap-y-1'>
            <FormInput
              name='name'
              type='text'
              label='Name (limit: 20 char)'
            />
            <FormInput
              name='tagline'
              type='text'
              label='Tagline (limit: 30 char)'
            />
            <CategoriesInput />
            <PriceInput />
          </div>
          <TextAreaInput name='description' label='description (10 - 100 words)' />
          <div className='grid md:grid-cols-2 gap-x-4 mt-6 mb-4'>
            <FormInput name="city" type="text" label="city" />
            <CountriesInput />
            <ImageInput />
          </div>
          <div>
            <h2 className='head-4 mb-4'>Accommodation details</h2>
            <CounterInput detail='guests' />
            <CounterInput detail='bedrooms' />
            <CounterInput detail='beds' />
            <CounterInput detail='baths' />
          </div>
          <div className='mt-6 md:mt-8'>
            <h4 className='head-4 mb-4'>Amenities</h4>
            <AmenitiesInput />
          </div>
          <SubmitButton text='create rental' className="mt-4 md:mt-6" />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateRentalPage;
