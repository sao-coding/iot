import toast from "react-hot-toast"
import { Device } from "@/types"

const TV = ({ device }: { device: Device }) => {
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
        <>
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
                <button
                    className='border p-2 rounded-xl flex items-center justify-center col-span-2'
                    onClick={() => control("ok")}
                >
                    <div className='text-xl font-bold'>確認</div>
                </button>
            </div>
            <div className='grid-cols-3 grid gap-2 py-2'>
                {[...Array(9)].map((_, i) => (
                    <button
                        key={i}
                        className='border p-2 rounded-xl h-32 flex items-center justify-center'
                        onClick={() => control(String(i + 1))}
                    >
                        <div className='text-xl font-bold'>{i + 1}</div>
                    </button>
                ))}
                {[...Array(3)].map((_, i) => (
                    <>
                        {i !== 1 ? (
                            <div className='border p-2 rounded-xl h-32 flex items-center justify-center'></div>
                        ) : (
                            <button
                                key={i}
                                className='border p-2 rounded-xl h-32 flex items-center justify-center'
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
