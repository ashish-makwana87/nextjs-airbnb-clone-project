import ChartContainer from "@/components/admin/ChartContainer";
import ChartsLoading from "@/components/admin/ChartsLoading";
import StatsContainer from "@/components/admin/StatsContainer";
import { StatsLoading } from "@/components/admin/StatsLoading";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

function AdminPage() {
  // extra check for admin user
  const { userId } = auth();
  if (userId !== process.env.ADMIN_USERID) {
    redirect("/");
  }

  return (
    <div className='alignment my-10 md:my-20'>
      <Suspense fallback={<StatsLoading />}>
        <StatsContainer />
      </Suspense>
      <Suspense fallback={<ChartsLoading />}>
        <ChartContainer />
      </Suspense>
    </div>
  );
}

export default AdminPage;
