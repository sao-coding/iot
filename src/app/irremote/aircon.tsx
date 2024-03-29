import toast from "react-hot-toast"

import { Device } from "@/types"

const Aircon = ({ device }: { device: Device }) => {
  const control = async (signal: string) => {
    const toastId = toast.loading("傳送中")
    // 等待 1 秒
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("成功", { id: toastId })
    // const res = await fetch("/api/irremote", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     devices: device.device,
    //     name: device.name,
    //     signal: signal
    //   })
    // })

    // if (res.ok) {
    //   toast.success("成功", { id: toastId })
    // } else {
    //   toast.error("失敗", { id: toastId })
    // }
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

export default Aircon
