import Link from "next/link"

const HomePage = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='grid grid-cols-2 justify-items-center gap-4'>
        <Link href='/irremote' className='rounded-xl border p-2 hover:bg-gray-200'>
          紅外線遙控器
        </Link>
        <Link href='/irremote-log' className='rounded-xl border p-2 hover:bg-gray-200'>
          紅外線遙控記錄
        </Link>
        <Link href='/fit' className='rounded-xl border p-2 hover:bg-gray-200'>
          Google Fit
        </Link>
      </div>
    </div>
  )
}

export default HomePage
