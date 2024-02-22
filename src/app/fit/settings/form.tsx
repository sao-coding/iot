"use client"
import React from "react"
import { User } from "next-auth"
const Form = ({ user }: { user: User }) => {
  // const [maxHeartRate, setMaxHeartRate] = React.useState(0)
  // const [minHeartRate, setMinHeartRate] = React.useState(0)
  // const [stepGoal, setStepGoal] = React.useState(0)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
    fetch("/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user.id,
        maxHeartRate: FormMaxHeartRate.value,
        minHeartRate: FormMinHeartRate.value,
        stepGoal: FormStepGoal.value,
        time: new Date()
      })
    })
  }

  return (
    <div>
      <h2>設定</h2>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <label>
          最高心率標準
          <input type='number' id='maxHeartRate' />
        </label>
        <label>
          最低心率標準
          <input type='number' id='minHeartRate' />
        </label>
        <label>
          步數目標
          <input type='number' id='stepGoal' />
        </label>
        <button type='submit'>儲存</button>
      </form>
    </div>
  )
}

export default Form
