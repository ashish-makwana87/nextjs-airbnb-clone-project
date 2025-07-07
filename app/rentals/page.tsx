import DeleteRental from "@/components/Booking/DeleteRental";
import { IconButton } from "@/components/form/Buttons";
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
import { fetchRentals } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";

async function RentalsPage() {

  const rentals = await fetchRentals();
  
  if(rentals.length === 0) {return <div className="alignment my-10 md:my-20">
    <EmptyList message="Create some rentals and they will appear here." title="No rentals found" />
  </div>}

  return (
    <section className='alignment my-10 md:my-20'>
      <h1 className='head-1 mb-6 md:mb-10'>Your Rentals</h1>
      <Table>
        <TableCaption>A list of all your rentals</TableCaption>
        <TableHeader className='bg-primary border border-primary'>
          <TableRow>
            <TableHead className='text-white text-center font-semibold md:text-base'>
              Property Name
            </TableHead>
            <TableHead className='text-white text-center font-semibold md:text-base'>
              Nightly Rate
            </TableHead>
            <TableHead className='text-white text-center font-semibold md:text-base'>
              Nights Booked
            </TableHead>
            <TableHead className='text-white text-center font-semibold md:text-base'>
              Total Revenue
            </TableHead>
            <TableHead className='text-white text-center font-semibold md:text-base'>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='border'>
          {rentals.map((rental) => {
            return (
              <TableRow key={rental.id}>
                <TableCell className='text-center'>
                  <Link href={`/properties/${rental.id}`} className='underline'>
                    {rental.name}
                  </Link>
                </TableCell>
                <TableCell className='text-center'>
                  {formatCurrency(rental.price)}
                </TableCell>
                <TableCell className='text-center'>
                  {rental.totalNightsSum || 0}
                </TableCell>
                <TableCell className='text-center'>
                  {formatCurrency(rental.totalRevenueSum)}
                </TableCell>
                <TableCell className='text-center'>
                  <div className="flex justify-center items-center gap-x-3">
                  <Link href={`rentals/${rental.id}/edit`}><IconButton actionType="edit" /></Link>
                  <DeleteRental propertyId={rental.id}/>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

export default RentalsPage;
