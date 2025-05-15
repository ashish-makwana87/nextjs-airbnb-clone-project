'use client';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

type Booking = {
  month: string,
  count: number
}

function Chart({data}: {data: Booking[]}) {
 

  return (
    <section className='mt-12 md:mt-16'>
      <h1 className='head-1 text-center mb-8 md:mb-10'>monthly bookings</h1>
      <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='month' />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Bar dataKey='count' fill='#e02252' barSize={75} />
      </BarChart>
      </ResponsiveContainer>
    </section>
  )
}

export default Chart