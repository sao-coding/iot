// "use client"

// import { useState, useEffect } from "react"
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"

const getGoogleFitData = async () => {
    const session = await getServerSession(authOptions)
    console.log({ session })
    if (!session) {
        return
    }
    const res = await fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
            aggregateBy: [
                {
                    dataTypeName: "com.google.sleep.segment",
                },
            ],

            startTimeMillis: 1692000000000,
            endTimeMillis: 1692812610658,
        }),
    })
    return await res.json()
}

const TestPage = async () => {
    // const [data, setData] = useState([])
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await fetch(
    //             "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ya29.a0AfB_byCQ2yDbWDpEh8Q9LXNF1kM-Vct8v6Y23Qsoejn1SHYMgG2-hsIVkYYP2Hcm0rzKrFCgVekkvtmlMl74v3-oOa7zCwLA0lISxintztMxhBBZWKjwZHZvjVSA05jh8ExwluW4IryRFZTxGY1Gqf861Ebu9xh_dVvMogaCgYKAWsSARISFQHsvYlsEuHaLARjrQSIHIu8l9xc7g0173`,
    //                 },
    //                 body: JSON.stringify({
    //                     aggregateBy: [
    //                         {
    //                             dataSourceId:
    //                                 "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
    //                         },
    //                     ],
    //                     bucketByTime: { durationMillis: 86400000 },
    //                     startTimeMillis: 1692547200000,
    //                     endTimeMillis: 1692627455410,
    //                 }),
    //             }
    //         )
    //         const data = await res.json()
    //         console.log(data)
    //         setData(data)
    //     }
    //     fetchData()
    // }, [])
    const data = await getGoogleFitData()

    return (
        <div>
            <h1>Test Page</h1>
            <pre>資料{JSON.stringify(data, null, 1)}</pre>
        </div>
    )
}

export default TestPage
