import DeleteBooking from "@/components/Booking/DeleteBooking";
import CountryDetails from "@/components/card/CountryDetails";
import FormContainer from "@/components/form/FormContainer";
import EmptyList from "@/components/home/EmptyList";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAllBookings } from "@/utils/actions";
import { formatCurrency, formatDate } from "@/utils/format";
import Link from "next/link";

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
      <h1 className='head-1 capitalize mb-6 md:mb-10'>Your Bookings</h1>
      <div>
        <Table>
          <TableCaption>A list of your recent bookings</TableCaption>
          <TableHeader className='bg-primary border border-primary'>
            <TableRow>
              <TableHead className='text-white text-center font-semibold md:text-base'>
                Property Name
              </TableHead>
              <TableHead className='text-white text-center font-semibold md:text-base'>
                Country
              </TableHead>
              <TableHead className='text-white text-center font-semibold md:text-base'>
                Nights
              </TableHead>
              <TableHead className='text-white text-center font-semibold md:text-base'>
                Check In
              </TableHead>
              <TableHead className='text-white text-center font-semibold md:text-base'>
                Check Out
              </TableHead>
              <TableHead className='text-white text-center font-semibold md:text-base'>
                Total
              </TableHead>
              <TableHead className='text-white text-center font-semibold md:text-base'>
                Delete Booking
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='border'>
            {bookings.map((booking) => {
              return (
                <TableRow key={booking.id}>
                  <TableCell className='text-center'>
                    <Link
                      href={`/properties/${booking.property.id}`}
                      className='underline'
                    >
                      {booking.property.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className='text-center flex justify-center items-center'>
                      <CountryDetails code={booking.property.country} />
                    </div>
                  </TableCell>
                  <TableCell className=' text-center'>
                    {booking.totalNights}
                  </TableCell>
                  <TableCell className=' text-center'>
                    {formatDate(booking.checkIn)}
                  </TableCell>
                  <TableCell className='text-center'>
                    {formatDate(booking.checkOut)}
                  </TableCell>
                  <TableCell className='text-center'>
                    {formatCurrency(booking.orderTotal)}
                  </TableCell>
                  <TableCell className=' text-center'>
                    <DeleteBooking bookingId={booking.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export default BookingsPage;
