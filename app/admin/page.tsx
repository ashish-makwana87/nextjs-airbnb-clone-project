import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


function AdminPage() {

  const {userId} = auth()

 if(userId !== "user_2uzRK0g1ggJNFqWnRE85qbVWdeZ") {redirect('/')}

  return (
    <div className='alignment my-10 md:my-20'>AdminPage</div>
  )
}

export default AdminPage;

