"use client";
import LoadingTable from "@/components/Booking/LoadingTable";

function loading() {
  
  return (
    <div className='alignment my-10 md:my-20'>
      <h3 className='head-2 mb-6 md:mb-10'>Your Bookings</h3>
      <LoadingTable rows={8} />
    </div>
  );
}

export default loading;
