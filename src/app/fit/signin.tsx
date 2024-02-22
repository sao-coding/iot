"use client"

// import { IconBrandGoogle } from "@tabler/icons-react"
import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react"

const signin = () => {
  return (
    <div className='flex items-center space-x-2'>
      <button className='rounded-xl border p-2 hover:bg-gray-200' onClick={() => signIn("google")}>
        使用 Google 登入
      </button>
      <button className='rounded-xl border p-2 hover:bg-gray-200' onClick={() => signOut()}>
        登出
      </button>
    </div>
  )
}

export default signin
