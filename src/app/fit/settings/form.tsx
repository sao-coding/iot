"use client"
import React from "react"
import { User } from "next-auth"
import toast from "react-hot-toast"
const Form = ({ user }: { user: User }) => {
  // const [maxHeartRate, setMaxHeartRate] = React.useState(0)
  // const [minHeartRate, setMinHeartRate] = React.useState(0)
  // const [stepGoal, setStepGoal] = React.useState(0)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const FormMaxHeartRate = event.currentTarget.elements.namedItem(
      "maxHeartRate"
    ) as HTMLInputElement
    const FormMinHeartRate = event.currentTarget.elements.namedItem(
      "minHeartRate"
    ) as HTMLInputElement
    const FormStepGoal = event.currentTarget.elements.namedItem("stepGoal") as HTMLInputElement

    // setMaxHeartRate(parseInt(FormMaxHeartRate.value))
    // setMinHeartRate(parseInt(FormMinHeartRate.value))
    // setStepGoal(parseInt(FormStepGoal.value))

    // console.log("maxHeartRate", maxHeartRate)
    // console.log("minHeartRate", minHeartRate)
    // console.log("stepGoal", stepGoal)
    console.log("maxHeartRate", FormMaxHeartRate.value)
    console.log("minHeartRate", FormMinHeartRate.value)
    console.log("stepGoal", FormStepGoal.value)
    console.log("userId", user.id)
    const toastId = toast.loading("傳送中")

    // 等待 2 秒
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("成功", { id: toastId })

    // const res = await fetch("/api/settings", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     userId: user.id,
    //     maxHeartRate: FormMaxHeartRate.value,
    //     minHeartRate: FormMinHeartRate.value,
    //     stepGoal: FormStepGoal.value,
    //     time: new Date()
    //   })
    // })

    // if (res.ok) {
    //   toast.success("成功", { id: toastId })
    // } else {
    //   toast.error("失敗", { id: toastId })
    // }
  }

  return (
    <div className='p-4'>
      <h2>設定</h2>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <label>
          最高心率標準
          <input type='number' id='maxHeartRate' value='160' />
        </label>
        <label>
          最低心率標準
          <input type='number' id='minHeartRate' value='60' />
        </label>
        <label>
          步數目標
          <input type='number' id='stepGoal' value="7500" />
        </label>
        <button type='submit' className='rounded-md bg-blue-500 px-4 py-2 text-white'>
          儲存
        </button>
      </form>
    </div>
  )
}

export default Form
