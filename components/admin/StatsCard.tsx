

type StatsCardProps = {
  title: string;
  value: number;
};

function StatsCard({ title, value }: StatsCardProps) {

  return (
    <section className='p-6 md:p-8 flex justify-between items-center bg-secondary rounded-md'>
      <h2 className='head-2'>{title}</h2>
      <h3 className='font-bold text-primary text-2xl tracking-wide capitalize md:text-3xl'>{value}</h3>
    </section>
  );
}

export default StatsCard;
