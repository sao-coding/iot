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
        <Link href='/fit/step' className='flex rounded-xl border p-2 hover:bg-gray-200'>
          Step
        </Link>
        <Link href='/fit/heart' className='flex rounded-xl border p-2 hover:bg-gray-200'>
          Heart
        </Link>
        <Link href='/fit/sleep' className='flex rounded-xl border p-2 hover:bg-gray-200'>
          Sleep
        </Link>
      </div>
    </div>
  )
}

export default FitPage
