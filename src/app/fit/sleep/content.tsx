"use client"

import { useEffect, useState } from "react"
import { User } from "next-auth"
import * as echarts from "echarts"

import { Sleep } from "@/types"
import { useQuery } from "@tanstack/react-query"

const Content = ({ user }: { user: User }) => {
  console.log({ user })
  // 今天日期
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10))
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
  type SleepList = {
    date: string
    time: number
  }
  const [daySleepList, setDaySleepList] = useState<SleepList[]>([])

  const [settings, setSettings] = useState({
    maxHeartRate: 100,
    minHeartRate: 60,
    stepGoal: 7500
  })

  const { data, isLoading, isError, error } = useQuery<Sleep, Error>({
    queryKey: ["sleep", { startDate, endDate }],
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
              dataTypeName: "com.google.sleep.segment"
            }
          ],
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
    // TimeNanos -> Time
    if (type === "nanos") {
      // xxxx-xx-xx -> TimeMillis zh-TW
      const date = new Date(parseInt(time) / 1000000)
      return date.toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })
    }
  }

  // 計算一天總睡眠時數 扣掉清醒時間 intVal === 1
  useEffect(() => {
    if (!data) return

    // 2024-03-05 轉換成 Date
    const startTime = new Date(startDate)
    const endTime = new Date(endDate)

    console.log("startTime", startTime)
    console.log("endTime", endTime)

    // 開始日期到結束日期 有幾個日期

    const dayList: Date[] = []
    for (let i = startTime; i <= endTime; i.setDate(i.getDate() + 1)) {
      dayList.push(new Date(i))
    }
    console.log("dayList", dayList)

    // 一天的睡眠時間
    const SleepList: SleepList[] = []
    for (let i = 0; i < dayList.length; i++) {
      console.log("dayList[i]", dayList[i])
      // 一天的睡眠時間
      let daySleep = 0
      data?.bucket[0]?.dataset[0].point.map((item) => {
        const date = new Date(parseInt(item.endTimeNanos) / 1000000)
        if (dayList[i].getDate() === date.getDate()) {
          // 扣掉清醒時間
          if (item.value[0].intVal !== 1) {
            daySleep +=
              (parseInt(item.endTimeNanos) - parseInt(item.startTimeNanos)) / 1000000000 / 60 / 60
          }
        }
      })
      // daySleepList.push({date: dayList[i].toLocaleDateString(), time: daySleep})
      SleepList.push({ date: dayList[i].toLocaleDateString(), time: daySleep })
    }
    setDaySleepList(SleepList)
  }, [data])

  useEffect(() => {
    console.log("daySleepList", daySleepList)
  }, [daySleepList])

  useEffect(() => {
    // 轉換 睡眠時間 變成柱狀圖
    let myChart = echarts.init(document.getElementById("main") as HTMLDivElement)
    let option: echarts.EChartsOption = {
      title: {
        text: "睡眠"
      },
      tooltip: {},
      legend: {
        data: ["睡眠時間"]
      },
      xAxis: {
        data: daySleepList.map((item) => item.date)
      },
      yAxis: {},
      series: [
        {
          name: "睡眠時間",
          type: "bar",
          data: daySleepList.map((item) => item.time.toFixed(2)),
          itemStyle: {
            color: (params) => {
              return (params.value as number) <= 8 && (params.value as number) >= 6
                ? "green"
                : "red"
            }
          }
        }
      ]
    }
    myChart.setOption(option)
  }, [daySleepList])

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
      <div id='main' style={{ width: "100%", height: "600px" }}></div>
      <div className=''>
        {daySleepList.map((item, index) => {
          return (
            <div key={index}>
              {item.date} {item.time.toFixed(2)} 小時
            </div>
          )
        })}
      </div>
      <div className=''>
        {startDate} {"~"} {endDate}
        {isLoading && <div>Loading...</div>}
        {isError && <div>{error?.message}</div>}
        {data?.bucket &&
          data?.bucket[0]?.dataset[0].point.map((item) => {
            return (
              <div key={item.startTimeNanos}>
                {item.value[0].intVal !== 1 && (
                  <>
                    <p>開始時間: {formatTime("nanos", item.startTimeNanos) as string}</p>
                    <p>結束時間: {formatTime("nanos", item.endTimeNanos) as string}</p>
                    {/* 三個 value 平均值:{" "} */}
                    {/* 
                    清醒 (在睡眠週期期間)	1
                    舒眠	2
                    床/床外	3
                    淺層睡眠	4
                    深層睡眠	5
                    快速動眼期	6 
                */}
                    <p>
                      睡眠階段類型:
                      {item.value[0].intVal === 1 && "清醒"}
                      {item.value[0].intVal === 2 && "舒眠"}
                      {item.value[0].intVal === 3 && "床/床外"}
                      {item.value[0].intVal === 4 && "淺層睡眠"}
                      {item.value[0].intVal === 5 && "深層睡眠"}
                      {item.value[0].intVal === 6 && "快速動眼期"}
                    </p>
                  </>
                )}
              </div>
            )
          })}
        {/* <pre>資料{JSON.stringify(data, null, 1)}</pre> */}
      </div>
    </div>
  )
}

export default Content
