import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { settings } from "@prisma/client"

export const GET = async (req: NextRequest) => {
  const data = (await prisma.$queryRaw`SELECT * FROM settings`) as settings[]
  return NextResponse.json(data[0])
}

export const POST = async (req: NextRequest) => {
  const res = await req.json()
  // 如果有此 user 的 settings 就更新，沒有就新增
  const hasSettings = await prisma.settings.findFirst({
    where: { userId: res.userId }
  })
  let data: settings
  if (hasSettings) {
    data = await prisma.settings.update({
      where: { id: hasSettings.id },
      data: {
        maxHeartRate: res.maxHeartRate,
        minHeartRate: res.minHeartRate,
        stepGoal: res.stepGoal,
        time: res.time
      }
    })
  } else {
    data = await prisma.settings.create({
      data: {
        maxHeartRate: res.maxHeartRate,
        minHeartRate: res.minHeartRate,
        stepGoal: res.stepGoal,
        time: res.time,
        user: { connect: { id: res.userId } }
      }
    })
  }

  return NextResponse.json({ status: "success", data })
}
