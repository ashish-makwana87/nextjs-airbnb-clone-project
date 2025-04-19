import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageUpdateContainer from "@/components/form/ImageUpdateContainer";
import {
  fetchProfileAction,
  updateProfileAction,
  updateProfileImageAction,
} from "@/utils/actions";

async function ProfilePage() {
  const profile = await fetchProfileAction();

  return (
    <section className='alignment my-10 md:my-20'>
      <h1 className='head-2 capitalize mb-6'>update profile</h1>
      <div className='border p-8 rounded-md max-w-2xl'>
        <ImageUpdateContainer
          action={updateProfileImageAction}
          image={profile.profileImage}
          name={profile.username}
          text='update profile image'
        />
        <FormContainer action={updateProfileAction}>
          <div className='grid md:grid-cols-2 gap-x-4'>
            <FormInput
              name='firstName'
              type='text'
              label='first name'
              defaultValue={profile.firstName}
            />
            <FormInput
              name='lastName'
              type='text'
              label='last name'
              defaultValue={profile.lastName}
            />
            <FormInput
              name='username'
              type='text'
              label='username'
              defaultValue={profile.username}
            />
          </div>
          <SubmitButton />
        </FormContainer>
      </div>
    </section>
  );
}

export default ProfilePage;
