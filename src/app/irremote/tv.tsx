import toast from "react-hot-toast"

import { Device } from "@/types"

const TV = ({ device }: { device: Device }) => {
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
    <>
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
          className='col-span-2 flex items-center justify-center rounded-xl border p-2'
          onClick={() => control("ok")}
        >
          <div className='text-xl font-bold'>確認</div>
        </button>
      </div>
      <div className='grid grid-cols-3 gap-2 py-2'>
        {[...Array(9)].map((_, i) => (
          <button
            key={i}
            className='flex h-32 items-center justify-center rounded-xl border p-2'
            onClick={() => control(String(i + 1))}
          >
            <div className='text-xl font-bold'>{i + 1}</div>
          </button>
        ))}
        {[...Array(3)].map((_, i) => (
          <>
            {i !== 1 ? (
              <div className='flex h-32 items-center justify-center rounded-xl border p-2'></div>
            ) : (
              <button
                key={i}
                className='flex h-32 items-center justify-center rounded-xl border p-2'
                onClick={() => control(String(i - 1))}
              >
                <div className='text-xl font-bold'>{i - 1}</div>
              </button>
            )}
          </>
        ))}
      </div>
    </>
  )
}

export default TV
