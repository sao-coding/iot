import toast from "react-hot-toast"

import { Device } from "@/types"

const Fan = ({ device }: { device: Device }) => {
  const control = async (signal: string) => {
    const res = await fetch("/api/irremote", {
      method: "POST",
      body: JSON.stringify({
        devices: device.device,
        name: device.name,
        signal: signal
      })
    })

    if (res.ok) {
      toast.success("成功")
    } else {
      toast.error("失敗")
    }
  }

  return (
    <div className='grid grid-cols-2 gap-2'>
      <button
        className='flex h-32 items-center justify-center rounded-xl border p-2'
        onClick={() => control("on")}
      >
        <div className='text-xl font-bold'>開</div>
      </button>
      <button
        className='flex h-32 items-center justify-center rounded-xl border p-2'
        onClick={() => control("off")}
      >
        <div className='text-xl font-bold'>關</div>
      </button>
      {/* 弱風 */}
      <button
        className='flex h-32 items-center justify-center rounded-xl border p-2'
        onClick={() => control("L-wind")}
      >
        <div className='text-xl font-bold'>弱風</div>
      </button>
      {/* 強風 */}
      <button
        className='flex h-32 items-center justify-center rounded-xl border p-2'
        onClick={() => control("H-wind")}
      >
        <div className='text-xl font-bold'>強風</div>
      </button>
      <button
        className='flex h-32 items-center justify-center rounded-xl border p-2'
        onClick={() => control("H-swing")}
      >
        <div className='text-xl font-bold'>水平擺動</div>
      </button>
      <button
        className='flex h-32 items-center justify-center rounded-xl border p-2'
        onClick={() => control("V-swing")}
      >
        <div className='text-xl font-bold'>垂直擺動</div>
      </button>
      {/* on off H-swing V-swing */}
    </div>
  )
}

export default Fan
