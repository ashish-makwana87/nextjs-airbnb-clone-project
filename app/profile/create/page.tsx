import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { createProfileAction } from "@/utils/actions";

function ProfileCreatePage() {
  return (
    <section className='alignment mt-10 md:mt-20'>
      <h1 className='head-3 capitalize mb-6'>new user</h1>
      <div className='border p-8 rounded-md max-w-2xl'>
        <FormContainer action={createProfileAction}>
          <div className='grid md:grid-cols-2 gap-x-4'>
            <FormInput name='firstName' type='text' label='first name' />
            <FormInput name='lastName' type='text' label='last name' />
            <FormInput name='username' type='text' label='username' />
          </div>
          <SubmitButton />
        </FormContainer>
      </div>
    </section>
  );
}

export default ProfileCreatePage;
