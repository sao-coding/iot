import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { settings } from "@prisma/client"

export const GET = async (req: NextRequest) => {
  const data = (await prisma.$queryRaw`SELECT * FROM settings`) as settings[]
  return NextResponse.json(data)
}

export const POST = async (req: NextRequest) => {
  const res = await req.json()
  const data = await prisma.settings.create({
    data: {
      maxHeartRate: res.maxHeartRate,
      minHeartRate: res.minHeartRate,
      stepGoal: res.stepGoal,
      time: res.time,
      user: { connect: { id: res.userId } }
    }
  })

  return NextResponse.json({ status: "success", data })
}
