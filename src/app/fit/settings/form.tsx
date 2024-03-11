"use client"
import React from "react"
import { User } from "next-auth"
import toast from "react-hot-toast"
const Form = ({ user }: { user: User }) => {
  const [maxHeartRate, setMaxHeartRate] = React.useState<string>("100")
  const [minHeartRate, setMinHeartRate] = React.useState<string>("60")
  const [stepGoal, setStepGoal] = React.useState<string>("7500")

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/settings")
      const data = await res.json()
      setMaxHeartRate(data.maxHeartRate)
      setMinHeartRate(data.minHeartRate)
      setStepGoal(data.stepGoal)
    }
    fetchData()
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // const FormMaxHeartRate = event.currentTarget.elements.namedItem(
    //   "maxHeartRate"
    // ) as HTMLInputElement
    // const FormMinHeartRate = event.currentTarget.elements.namedItem(
    //   "minHeartRate"
    // ) as HTMLInputElement
    // const FormStepGoal = event.currentTarget.elements.namedItem("stepGoal") as HTMLInputElement

    console.log("userId", user.id)
    const toastId = toast.loading("傳送中")

    // // 等待 2 秒
    // await new Promise((resolve) => setTimeout(resolve, 2000))

    // toast.success("成功", { id: toastId })

    const res = await fetch("/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user.id,
        maxHeartRate: maxHeartRate,
        minHeartRate: minHeartRate,
        stepGoal: stepGoal,
        time: new Date()
      })
    })

    if (res.ok) {
      toast.success("成功", { id: toastId })
    } else {
      toast.error("失敗", { id: toastId })
    }
  }

  return (
    <div className='p-4'>
      <h2>設定</h2>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <label>
          最高心率標準
          <input
            type='number'
            id='maxHeartRate'
            // defaultValue='100'
            value={maxHeartRate}
            onChange={(e) => setMaxHeartRate(e.target.value)}
          />
        </label>
        <label>
          最低心率標準
          <input
            type='number'
            id='minHeartRate'
            // defaultValue='60'
            value={minHeartRate}
            onChange={(e) => setMinHeartRate(e.target.value)}
          />
        </label>
        <label>
          步數目標
          <input
            type='number'
            id='stepGoal'
            // defaultValue='7500'
            value={stepGoal}
            onChange={(e) => setStepGoal(e.target.value)}
          />
        </label>
        <button type='submit' className='rounded-md bg-blue-500 px-4 py-2 text-white'>
          儲存
        </button>
      </form>
    </div>
  )
}

export default Form
