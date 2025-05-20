import Link from "next/link";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

export default function NotFound() {
  return (
    <main className='alignment my-10 md:my-20 flex h-full flex-col items-center justify-center gap-2'>
      <MdOutlineReportGmailerrorred className='w-14 h-14 md:w-28 md:h-28 text-primary' />
      <h1 className='head-1'>404 Not Found</h1>
      <p>Could not find the requested page.</p>
      <Link
        href='/'
        className='mt-4 rounded-md bg-primary px-4 py-2 text-sm md:text-base text-white transition-colors hover:bg-primary'
      >
        Back to Home
      </Link>
    </main>
  );
}
