import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { log } from "@prisma/client"

export const POST = async (req: NextRequest) => {
    const res = await req.json()
    const data =
        (await prisma.$queryRaw`INSERT INTO log (devices, name, IR_signal) VALUES (${res.devices}, ${res.name}, ${res.signal})`) as log[]

    return NextResponse.json({ status: "success", res })
}
