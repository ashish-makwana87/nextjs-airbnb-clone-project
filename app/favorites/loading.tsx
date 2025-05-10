import LoadingCards from "@/components/card/LoadingCards";

function loading() {
  return (
    <div className='alignment my-10 md:my-20'>
      <h1 className='head-1 capitalize mb-10'>favorite properties</h1>
      <LoadingCards />
    </div>
  );
}

export default loading;
