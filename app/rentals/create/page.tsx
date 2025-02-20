import { SubmitButton } from "@/components/form/Buttons";
import CategoriesInput from "@/components/form/CategoriesInput";
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
      <h1 className='head-3 capitalize mb-6'>create rental</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={createPropertyAction}>
          <div className='grid md:grid-cols-2 gap-x-4'>
            <FormInput
              name='name'
              type='text'
              label='Name (limit: 20 char)'
              defaultValue='Cabin in Japan'
            />
            <FormInput
              name='tagline'
              type='text'
              label='Tagline (limit: 30 char)'
              defaultValue='Dream getaway luxury experience'
            />
            <PriceInput />
            <CategoriesInput />
          </div>
          <TextAreaInput name='description' label='description' />
          <div className="grid md:grid-cols-2 gap-x-4 mt-6">
          <CountriesInput />
          <ImageInput />
          </div>
          <SubmitButton text='create rental' />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateRentalPage;
