"use client"

import { useEffect, useState } from "react"
import { User } from "next-auth"
import * as echarts from "echarts"
import toast from "react-hot-toast"

import { Step } from "@/types"
import { useQuery } from "@tanstack/react-query"

const Content = ({ user }: { user: User }) => {
  console.log({ user })
  // 開始日期 = 今天日期 - 1
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() + 8 * 60 * 60 * 1000 - 86400000).toISOString().slice(0, 10)
  )
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10)
  )

  const { data, isLoading, isError, error } = useQuery<Step, Error>({
    queryKey: ["step", { startDate, endDate }],
    queryFn: async () => {
      const res = await fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({
          aggregateBy: [
            {
              dataSourceId:
                "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
              // dataTypeName: "com.google.sleep.segment",
            }
          ],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis: formatTime("in", startDate),
          endTimeMillis: formatTime("in", endDate)
        })
      })
      return await res.json()
    }
  })

  useEffect(() => {
    const date = new Date(endDate)
    console.log("date useEffect", date.getTime() - 8 * 60 * 60 * 1000)
  }, [endDate])

  useEffect(() => {
    // 把資料 步數 轉成陣列
    const step =
      data?.bucket?.map((item) => {
        return item.dataset[0].point[0]?.value[0]?.intVal
      }) ?? []

    // 把資料 時間 轉成陣列
    const date = data?.bucket.map((item) => {
      // 轉換日期 xx/xx
      return (
        new Date(parseInt(item.startTimeMillis)).getMonth() +
        1 +
        "/" +
        new Date(parseInt(item.startTimeMillis)).getDate()
      )
    })
    let myChart = echarts.init(document.getElementById("main") as HTMLDivElement)
    // 指定圖表的配置項和數據
    let option: echarts.EChartsOption = {
      title: {
        text: "步數"
      },
      tooltip: {},
      legend: {
        data: ["推薦步數", "步數"]
      },
      xAxis: {
        data: date ?? []
      },
      yAxis: {},
      series: [
        {
          name: "步數",
          type: "bar",
          // 判斷每筆資料是否大於7500 大於7500為綠色 小於7500為紅色
          data: step ?? [],
          itemStyle: {
            color: (params) => {
              return (params.value as number) > 7500 ? "green" : "red"
            }
          }
        }
      ]
    }
    // 使用剛指定的配置項和數據顯示圖表
    myChart.setOption(option)
  }, [data])

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
          // 開始日期不能大於結束日期
          onChange={(e) => {
            if (e.target.value > endDate) {
              toast.error("開始日期不能大於結束日期")
            } else {
              setStartDate(e.target.value)
            }
          }}
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
        {startDate} {"~"} {endDate}
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error?.message}</div>}
        <div id='main' style={{ width: "100%", height: "600px" }}></div>
        {data?.bucket &&
          data?.bucket.map((item) => {
            return (
              <div key={item.startTimeMillis}>
                <p>開始時間: {formatTime("out", item.startTimeMillis)}</p>
                <p>結束時間: {formatTime("out", item.endTimeMillis)}</p>
                <p>步數: {item.dataset[0].point[0]?.value[0]?.intVal}</p>
              </div>
            )
          })}
        {/* <pre>資料{JSON.stringify(data, null, 1)}</pre> */}
      </div>
    </div>
  )
}

export default Content
