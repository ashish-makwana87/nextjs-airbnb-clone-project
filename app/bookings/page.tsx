import EmptyList from "@/components/home/EmptyList";
import { fetchAllBookings } from "@/utils/actions";

async function BookingsPage() {
  const bookings = await fetchAllBookings();

  if (bookings.length === 0) {
    return (
      <EmptyList
        title='No bookings to display'
        message='Make some bookings to appear here'
        className='alignment mt-10 md:mt-20'
        btnText='Browse properties'
      />
    );
  }

  return (
    <section className='alignment my-10 md:my-20'>
      <h4 className='head-3 capitalize mb-3'>Your Bookings</h4>
      <div>
        {bookings.map((booking) => {
          return <h2 key={booking.id}>{booking.property.name}</h2>;
        })}
      </div>
    </section>
  );
}

export default BookingsPage;
