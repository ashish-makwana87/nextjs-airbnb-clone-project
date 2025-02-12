import { fetchProfileImage } from "@/utils/actions";
import { LucideUser2 } from "lucide-react";

async function UserIcon() {
  const profileImage = await fetchProfileImage();

  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt='profile image'
        className='h-10 w-10 rounded-full object-cover'
      />
    );
  }

  return (
    <div>
      <LucideUser2 className='h-10 w-10 bg-primary text-white rounded-full dark:bg-transparent ' />
    </div>
  );
}

export default UserIcon;
