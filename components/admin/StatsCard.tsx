

type StatsCardProps = {
  title: string;
  value: number;
};

function StatsCard({ title, value }: StatsCardProps) {

  return (
    <section className='p-6 md:p-8 flex justify-between items-center bg-secondary rounded-md'>
      <h6 className='head-3'>{title}</h6>
      <h6 className='head-2 font-bold text-primary'>{value}</h6>
    </section>
  );
}

export default StatsCard;
