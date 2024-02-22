import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { aircon, fan, tv } from "@prisma/client"

export const GET = async (req: NextRequest) => {
  const airconData = (await prisma.$queryRaw`SELECT name FROM aircon`) as aircon[]
  const fanData = (await prisma.$queryRaw`SELECT name FROM fan`) as fan[]
  const tvData = (await prisma.$queryRaw`SELECT name FROM tv`) as tv[]
  const tables = [
    ...airconData.map((item) => {
      return { ...item, device: "aircon" }
    }),
    ...fanData.map((item) => {
      return { ...item, device: "fan" }
    }),
    ...tvData.map((item) => {
      return { ...item, device: "tv" }
    })
  ]
  return NextResponse.json(tables)
}
