"use client"

import { User } from "next-auth"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import * as echarts from "echarts"
import { Heart } from "@/types"

const Content = ({ user }: { user: User }) => {
    console.log({ user })
    // 開始日期 = 今天日期 - 1
    const [startDate, setStartDate] = useState(
        new Date(new Date().getTime() + 8 * 60 * 60 * 1000 - 86400000).toISOString().slice(0, 10)
    )
    const [endDate, setEndDate] = useState(
        new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10)
    )

    const [interval, setInterval] = useState(1800000)

    const [chartType, setChartType] = useState("scatter")

    const { data, isLoading, isError, error } = useQuery<Heart, Error>({
        queryKey: ["heart", startDate, endDate, interval],
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
                                    "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm",
                            },
                        ],
                        bucketByTime: { durationMillis: interval },
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
        console.log("date useEffect", date.getTime() - 8 * 60 * 60 * 1000)
    }, [endDate])
    // {
    //     "bucket": [
    //       {
    //         "startTimeMillis": "1699804800000",
    //         "endTimeMillis": "1699891200000",
    //         "dataset": [
    //           {
    //             "dataSourceId": "derived:com.google.heart_rate.summary:com.google.android.gms:aggregated",
    //             "point": [
    //               {
    //                 "startTimeNanos": "1699838930418956800",
    //                 "endTimeNanos": "1699891055458299136",
    //                 "dataTypeName": "com.google.heart_rate.summary",
    //                 "originDataSourceId": "derived:com.google.heart_rate.bpm:com.google.ios.fit:appleinc.:watch:a1f38427:top_level",
    //                 "value": [
    //                   {
    //                     "fpVal": 75.279205133122147,
    //                     "mapVal": []
    //                   },
    //                   {
    //                     "fpVal": 119,
    //                     "mapVal": []
    //                   },
    //                   {
    //                     "fpVal": 55.797481536865234,
    //                     "mapVal": []
    //                   }
    //                 ]
    //               }
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         "startTimeMillis": "1699891200000",
    //         "endTimeMillis": "1699977600000",
    //         "dataset": [
    //           {
    //             "dataSourceId": "derived:com.google.heart_rate.summary:com.google.android.gms:aggregated",
    //             "point": [
    //               {
    //                 "startTimeNanos": "1699891384468514560",
    //                 "endTimeNanos": "1699955673941447680",
    //                 "dataTypeName": "com.google.heart_rate.summary",
    //                 "originDataSourceId": "derived:com.google.heart_rate.bpm:com.google.ios.fit:appleinc.:watch:a1f38427:top_level",
    //                 "value": [
    //                   {
    //                     "fpVal": 74.045629485596024,
    //                     "mapVal": []
    //                   },
    //                   {
    //                     "fpVal": 135,
    //                     "mapVal": []
    //                   },
    //                   {
    //                     "fpVal": 47.897388458251953,
    //                     "mapVal": []
    //                   }
    //                 ]
    //               }
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         "startTimeMillis": "1699977600000",
    //         "endTimeMillis": "1700064000000",
    //         "dataset": [
    //           {
    //             "dataSourceId": "derived:com.google.heart_rate.summary:com.google.android.gms:aggregated",
    //             "point": [
    //               {
    //                 "startTimeNanos": "1699978987670466816",
    //                 "endTimeNanos": "1700038606455666176",
    //                 "dataTypeName": "com.google.heart_rate.summary",
    //                 "originDataSourceId": "derived:com.google.heart_rate.bpm:com.google.ios.fit:appleinc.:watch:a1f38427:top_level",
    //                 "value": [
    //                   {
    //                     "fpVal": 77.305339154703361,
    //                     "mapVal": []
    //                   },
    //                   {
    //                     "fpVal": 120,
    //                     "mapVal": []
    //                   },
    //                   {
    //                     "fpVal": 52,
    //                     "mapVal": []
    //                   }
    //                 ]
    //               }
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         "startTimeMillis": "1700064000000",
    //         "endTimeMillis": "1700150400000",
    //         "dataset": [
    //           {
    //             "dataSourceId": "derived:com.google.heart_rate.summary:com.google.android.gms:aggregated",
    //             "point": [
    //               {
    //                 "startTimeNanos": "1700065708875809024",
    //                 "endTimeNanos": "1700150343507628032",
    //                 "dataTypeName": "com.google.heart_rate.summary",
    //                 "originDataSourceId": "derived:com.google.heart_rate.bpm:com.google.ios.fit:appleinc.:watch:a1f38427:top_level",
    //                 "value": [
    //                   {
    //                     "fpVal": 65.033522383983012,
    //                     "mapVal": []
    //                   },
    //                   {
    //                     "fpVal": 111,
    //                     "mapVal": []
    //                   },
    //                   {
    //                     "fpVal": 50,
    //                     "mapVal": []
    //                   }
    //                 ]
    //               }
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         "startTimeMillis": "1700150400000",
    //         "endTimeMillis": "1700236800000",
    //         "dataset": [
    //           {
    //             "dataSourceId": "derived:com.google.heart_rate.summary:com.google.android.gms:aggregated",
    //             "point": [
    //               {
    //                 "startTimeNanos": "1700150646476517120",
    //                 "endTimeNanos": "1700235666230422528",
    //                 "dataTypeName": "com.google.heart_rate.summary",
    //                 "originDataSourceId": "derived:com.google.heart_rate.bpm:com.google.ios.fit:appleinc.:watch:a1f38427:top_level",
    //                 "value": [
    //                   {
    //                     "fpVal": 89.238079987070051,
    //                     "mapVal": []
    //                   },
    //                   {
    //                     "fpVal": 134,
    //                     "mapVal": []
    //                   },
    //                   {
    //                     "fpVal": 58,
    //                     "mapVal": []
    //                   }
    //                 ]
    //               }
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         "startTimeMillis": "1700236800000",
    //         "endTimeMillis": "1700323200000",
    //         "dataset": [
    //           {
    //             "dataSourceId": "derived:com.google.heart_rate.summary:com.google.android.gms:aggregated",
    //             "point": []
    //           }
    //         ]
    //       }
    //     ]
    //   }

    useEffect(() => {
        // 把資料 平均值 最高值 最低值個轉成一個陣列
        const avg = data?.bucket.map((item) => {
            return item.dataset[0].point[0]?.value[0].fpVal.toFixed(0)
        })
        const max = data?.bucket.map((item) => {
            return item.dataset[0].point[0]?.value[1].fpVal
        })

        const min = data?.bucket.map((item) => {
            return item.dataset[0].point[0]?.value[2].fpVal
        })
        // const date = data?.bucket.map((item) => {
        //     // 轉換日期 xx/xx
        //     return (
        //         new Date(parseInt(item.startTimeMillis)).getMonth() +
        //         1 +
        //         "/" +
        //         new Date(parseInt(item.startTimeMillis)).getDate()
        //     )
        // })
        let time
        if (interval === 86400000) {
            time = data?.bucket.map((item) => {
                // 轉換日期 xx/xx
                return (
                    new Date(parseInt(item.startTimeMillis)).getMonth() +
                    1 +
                    "/" +
                    new Date(parseInt(item.startTimeMillis)).getDate()
                )
            })
        } else {
            time = data?.bucket.map((item) => {
                // 轉換 時間 xx:xx
                return new Date(parseInt(item.startTimeMillis))
                    .toLocaleTimeString("zh-TW", {
                        hour12: false,
                    })
                    .slice(0, 5)
            })
        }

        console.log("time", time)
        console.log("avg", avg)
        console.log("max", max)
        console.log("min", min)
        let myChart = echarts.init(document.getElementById("main") as HTMLDivElement)
        // 指定圖表的配置項和數據
        let option = {
            title: {
                text: "心率",
            },
            tooltip: {},
            legend: {
                data: ["平均心率", "最高心率", "最低心率"],
            },
            xAxis: {
                data: time ?? [],
            },
            yAxis: {},
            series: [
                {
                    name: "平均心率",
                    type: chartType,
                    data: avg,
                },
                {
                    name: "最高心率",
                    type: chartType,
                    data: max,
                },
                {
                    name: "最低心率",
                    type: chartType,
                    data: min,
                },
            ],
        }
        // 使用剛指定的配置項和數據顯示圖表。
        console.log("option", option)
        myChart.setOption(option)
    }, [data, chartType])

    const formatTime = (type: string, time: string) => {
        // TimeMillis -> Time
        // 1694534400000 -> xxxx-xx-xx xx:xx:xx zh-TW
        // in out
        if (type === "in") {
            // xxxx-xx-xx -> TimeMillis zh-TW
            const date = new Date(time)
            console.log("date", date.getTime() - 8 * 60 * 60 * 1000)
            return date.getTime() - 8 * 60 * 60 * 1000
        }
        if (type === "out") {
            const date = new Date(parseInt(time))
            return date.toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })
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
                間隔時間
                <select name='' id='' onChange={(e) => setInterval(parseInt(e.target.value))}>
                    <option value='1800000'>30分鐘</option>
                    <option value='3600000'>1小時</option>
                    <option value='7200000'>2小時</option>
                    <option value='14400000'>4小時</option>
                    <option value='28800000'>8小時</option>
                    <option value='43200000'>12小時</option>
                    <option value='86400000'>24小時</option>
                </select>
            </div>
            <div className='hidden'>
                <select name='' id='' onChange={(e) => setChartType(e.target.value)}>
                    <option value='scatter'>散點圖</option>
                    <option value='line'>折線圖</option>
                </select>
            </div>
            <div className=''>
                {startDate} {"~"} {endDate}
                {isLoading && <div>Loading...</div>}
                {isError && <div>{error?.message}</div>}
                {/* {data?.bucket[0]?.dataset[0]?.point[0] && ( */}
                <div id='main' style={{ width: "100%", height: "600px" }} className='hidden'></div>
                {/* )} */}
                {data?.bucket[0]?.dataset[0] &&
                    data?.bucket.map((item) => {
                        return (
                            <div key={item.startTimeMillis}>
                                <p>開始時間: {formatTime("out", item.startTimeMillis)}</p>
                                <p>結束時間: {formatTime("out", item.endTimeMillis)}</p>
                                {/* 三個 value 平均值:{" "} */}
                                <p>
                                    平均心率: {item.dataset[0].point[0]?.value[0].fpVal.toFixed(0)}
                                </p>
                                <p>最高心率: {item.dataset[0].point[0]?.value[1].fpVal}</p>
                                <p>最低心率: {item.dataset[0].point[0]?.value[2].fpVal}</p>
                            </div>
                        )
                    })}
                <pre>資料{JSON.stringify(data, null, 1)}</pre>
            </div>
        </div>
    )
}

export default Content
