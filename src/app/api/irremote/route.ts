import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { aircon, fan, tv } from "@prisma/client"
import Channel from "@/config/TVchannel"

export const POST = async (req: NextRequest) => {
    const res = (await req.json()) as { devices: string; name: string; signal: string }
    console.log(res)

    // const res2 = await fetch(`http://192.168.1.97/?${res}`)
    // const data = await res2.json()
    // console.log(data)
    // return NextResponse.json(data)
    // {
    //     "devices": "fan",
    //     "name": "電風扇",
    //     "signal": "on"
    //   }
    // 查詢資料庫是否有此名稱的設備 查詢訊號 送出訊號

    let signal

    if (res.devices === "aircon") {
        const data =
            (await prisma.$queryRaw`SELECT * FROM aircon where name = ${res.name}`) as aircon[]
        // 移除所有空白 轉數字陣列

        const rawData = data[0][res.signal as keyof aircon]
            ?.toString()
            .replace(/\s+/g, "")
            .split(",")
            .map((v) => Number(v))
        console.log(rawData)
        signal = {
            mode: data[0].mode,
            devices: res.devices,
            protocols: data[0].protocols,
            // 轉數字陣列
            signal: rawData,
        }
    }

    if (res.devices === "fan") {
        const data = (await prisma.$queryRaw`SELECT * FROM fan where name = ${res.name}`) as fan[]
        // const signal = data[0][res.signal as keyof fan]
        signal = {
            mode: data[0].mode,
            devices: res.devices,
            protocols: data[0].protocols,
            // signal: data[0][res.signal as keyof fan],
            signal: [data[0][res.signal as keyof fan], data[0].bits, "3"],
        }
    }

    if (res.devices === "tv") {
        const data = (await prisma.$queryRaw`SELECT * FROM tv where name = ${res.name}`) as tv[]

        // 將數字轉換成英文存陣列
        // console.log(data[0])
        if (!isNaN(Number(res.signal))) {
            const channel = res.signal.split("").map((v) => Channel[v])
            console.log(channel)

            // channel陣列 比對 資料庫的channel
            const channelSignal = channel.map((v) => data[0][v as keyof tv])
            console.log(channelSignal)

            let channelArr = []
            for (let i = 0; i < channelSignal.length; i++) {
                const signal = {
                    // mode: data[0].mode,
                    // protocols: data[0].protocols,
                    signal: [channelSignal[i], data[0].bits, 3],
                }
                channelArr.push([channelSignal[i], data[0].bits, "3"])
            }

            signal = {
                mode: data[0].mode,
                devices: res.devices,
                protocols: data[0].protocols,
                channel: true,
                signal: channelArr,
            }
        } else {
            signal = {
                mode: data[0].mode,
                devices: res.devices,
                protocols: data[0].protocols,
                channel: false,
                signal: [data[0][res.signal as keyof tv], data[0].bits, "3"],
            }
        }
    }

    const res2 = await fetch("http://192.168.123.97", {
        method: "POST",
        body: JSON.stringify(signal),
    })
    const data2 = await res2.json()
    console.log({ data2 }, { signal })
    return NextResponse.json({ signal })
}
