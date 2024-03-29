"use client"
import { log } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

const IrremoteLogPage = () => {
  const { data, isLoading } = useQuery<log[]>({
    queryKey: ["irremote-log"],
    queryFn: async () => {
      const res = await fetch("/api/irremote-log")
      return await res.json()
    }
  })

  return (
    <div className='p-4'>
      <h1 className='mb-2 text-2xl font-bold'>紅外線遙控記錄</h1>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          {data &&
            data.map((log) => (
              <div key={new Date(log.time).getTime()}>
                <div>類別: {log.name}</div>
                <div>裝置: {log.devices}</div>
                <div>訊號: {log.IR_signal}</div>
                <div>
                  時間:{" "}
                  {new Date(log.time).toLocaleString("zh-TW", {
                    timeZone: "Asia/Taipei"
                  })}
                </div>
                <hr className='my-1 border-2' />
              </div>
            ))}
        </>
      )}
    </div>
  )
}

export default IrremoteLogPage
