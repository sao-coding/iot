import Link from "next/link"
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"
// import { IconBrandGoogle } from "@tabler/icons-react"
import Signin from "./signin"

const FitPage = async () => {
    const session = await getServerSession(authOptions)

    return (
        <div>
            <h1>Fit Page</h1>
            {/* 是否登入 */}
            <div className=''>
                {session ? (
                    <div>
                        <div className='text-green-500'>登入 Email: {session.user.email}</div>
                        <div className='text-green-500'>暱稱: {session.user.name}</div>
                    </div>
                ) : (
                    <div className='text-red-500'>未登入</div>
                )}
            </div>
            <Signin />
            <div className='mt-2 flex items-center space-x-2'>
                <Link href='/fit/step' className='border p-2 rounded-xl hover:bg-gray-200 flex'>
                    Step
                </Link>
                <Link href='/fit/heart' className='border p-2 rounded-xl hover:bg-gray-200 flex'>
                    Heart
                </Link>
            </div>
        </div>
    )
}

export default FitPage
