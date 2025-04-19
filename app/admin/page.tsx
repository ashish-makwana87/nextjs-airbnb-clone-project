import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


function AdminPage() {

  // extra check for admin user
  const {userId} = auth();
  if(userId !== process.env.ADMIN_USERID) {redirect('/')}

  return (
    <div className='alignment my-10 md:my-20'>AdminPage</div>
  )
}

export default AdminPage;

