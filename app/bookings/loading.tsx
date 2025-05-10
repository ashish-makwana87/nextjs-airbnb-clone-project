import LoadingTable from "@/components/Booking/LoadingTable";

function loading() {
  
  return (
    <div className='alignment my-10 md:my-20'>
      <h1 className='head-1 mb-6 md:mb-10'>Your Bookings</h1>
      <LoadingTable rows={8} />
    </div>
  );
}

export default loading;
