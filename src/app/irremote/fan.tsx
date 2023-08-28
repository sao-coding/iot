import toast from "react-hot-toast"
import { Device } from "@/types"

const Fan = ({ device }: { device: Device }) => {
    const control = async (signal: string) => {
        const res = await fetch("/api/irremote", {
            method: "POST",
            body: JSON.stringify({
                devices: device.device,
                name: device.name,
                signal: signal,
            }),
        })

        if (res.ok) {
            toast.success("成功")
        } else {
            toast.error("失敗")
        }
    }

    return (
        <div className='grid-cols-2 grid gap-2'>
            <button
                className='border p-2 rounded-xl h-32 flex items-center justify-center'
                onClick={() => control("on")}
            >
                <div className='text-xl font-bold'>開</div>
            </button>
            <button
                className='border p-2 rounded-xl h-32 flex items-center justify-center'
                onClick={() => control("off")}
            >
                <div className='text-xl font-bold'>關</div>
            </button>
            {/* 弱風 */}
            <button
                className='border p-2 rounded-xl h-32 flex items-center justify-center'
                onClick={() => control("L-wind")}
            >
                <div className='text-xl font-bold'>弱風</div>
            </button>
            {/* 強風 */}
            <button
                className='border p-2 rounded-xl h-32 flex items-center justify-center'
                onClick={() => control("H-wind")}
            >
                <div className='text-xl font-bold'>強風</div>
            </button>
            <button
                className='border p-2 rounded-xl h-32 flex items-center justify-center'
                onClick={() => control("H-swing")}
            >
                <div className='text-xl font-bold'>水平擺動</div>
            </button>
            <button
                className='border p-2 rounded-xl h-32 flex items-center justify-center'
                onClick={() => control("V-swing")}
            >
                <div className='text-xl font-bold'>垂直擺動</div>
            </button>
            {/* on off H-swing V-swing */}
        </div>
    )
}

export default Fan
