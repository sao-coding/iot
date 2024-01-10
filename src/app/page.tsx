import Link from "next/link"

const HomePage = () => {
    return (
        <div className='flex items-center justify-center h-full'>
            <div className='grid grid-cols-2 gap-4 justify-items-center'>
                {/* <Link href='/irremote' className='border p-2 rounded-xl hover:bg-gray-200'>
                    紅外線遙控器
                </Link> */}
                <Link href='/irremote-log' className='border p-2 rounded-xl hover:bg-gray-200'>
                    紅外線遙控記錄
                </Link>
                <Link href='/fit' className='border p-2 rounded-xl hover:bg-gray-200'>
                    Google Fit
                </Link>
            </div>
        </div>
    )
}

export default HomePage
