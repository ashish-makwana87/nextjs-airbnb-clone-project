import UpdatePropertyImage from "@/components/properties/UpdatePropertyImage";
import { Separator } from "@/components/ui/separator";
import { fetchRentalDetails } from "@/utils/actions";
import Image from "next/image";
import { redirect } from "next/navigation";

async function EditRentalPage({ params }: { params: { id: string } }) {
  const rental = await fetchRentalDetails(params.id);

  if (!rental) redirect("/");

  return (
    <section className='alignment my-10 md:my-20'>
      <h2 className='head-3 capitalize mb-4 md:mb-8'>Edit Property Info</h2>
      <div className='border p-4 rounded'>
        <Image
          src={rental.image}
          alt={rental.name}
          width={1000}
          height={1000}
          className='w-20 h-20 md:w-28 md:h-28 rounded object-cover'
        />
        <div className='mt-4'>
          <UpdatePropertyImage propertyId={params.id} />
        </div>
        <Separator className='mt-6' />
        <div className="mt-4">
          <h4 className='head-4 capitalize'>update property details</h4>
        </div>
      </div>
    </section>
  );
}

export default EditRentalPage;
