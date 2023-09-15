"use client"

import { User } from "next-auth"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Step } from "@/types"

const Content = ({ user }: { user: User }) => {
    console.log({ user })
    // 今天日期
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10))
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))

    const { data, isLoading, isError, error } = useQuery<Step, Error>({
        queryKey: ["googleFit", { startDate, endDate }],
        queryFn: async () => {
            const res = await fetch(
                "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                    body: JSON.stringify({
                        aggregateBy: [
                            {
                                dataSourceId:
                                    "derived:com.google.step_count.delta:com.google.android.gms:merge_step_deltas",
                                // dataTypeName: "com.google.sleep.segment",
                            },
                        ],
                        bucketByTime: { durationMillis: 86400000 },
                        startTimeMillis: formatTime("in", startDate),
                        endTimeMillis: formatTime("in", endDate),
                    }),
                }
            )
            return await res.json()
        },
    })

    useEffect(() => {
        const date = new Date(endDate)
        console.log("date", date.getTime())
    }, [endDate])

    const formatTime = (type: string, time: string) => {
        // TimeMillis -> Time
        // 1694534400000 -> xxxx-xx-xx xx:xx:xx zh-TW
        // in out
        if (type === "in") {
            // xxxx-xx-xx -> TimeMillis utc
            const date = new Date(time)
            console.log("date", date.getTime())
            return date.getTime()
        }
        if (type === "out") {
            const date = new Date(parseInt(time))
            return date.toLocaleString("zh-TW")
        }
    }

    return (
        <div>
            <h1>Content</h1>
            <div className='space-x-5 p-4 text-center'>
                起始日期
                <input
                    type='date'
                    name=''
                    id=''
                    className='ml-2'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                結束日期
                <input
                    type='date'
                    name=''
                    id=''
                    className='ml-2'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <div className=''>
                {startDate}
                {endDate}
                {isLoading && <div>Loading...</div>}
                {isError && <div>{error?.message}</div>}
                {data?.bucket.map((item) => {
                    return (
                        <div key={item.startTimeMillis}>
                            <p>開始時間: {formatTime("out", item.startTimeMillis)}</p>
                            <p>結束時間: {formatTime("out", item.endTimeMillis)}</p>
                            <p>步數: {item.dataset[0].point[0].value[0].intVal}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Content
