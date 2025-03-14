import { fetchPropertyDetails } from "@/utils/actions";
import { redirect } from "next/navigation";

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await fetchPropertyDetails(params.id);

  if (!property) redirect("/");

  return (
    <section className='alignment my-10 md:my-20'>PropertyDetailsPage</section>
  );
}

export default PropertyDetailsPage;
