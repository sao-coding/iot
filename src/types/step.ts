export type Step = {
    bucket: Bucket[]
}

// {
//     "startTimeMillis": "1694534400000",
//     "endTimeMillis": "1694620800000",
//     "dataset": [
//      {
//       "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:aggregated",
//       "point": [
//        {
//         "startTimeNanos": "1694537303661314040",
//         "endTimeNanos": "1694620102621281390",
//         "dataTypeName": "com.google.step_count.delta",
//         "originDataSourceId": "raw:com.google.step_count.cumulative:blackshark:SHARK PRS-H0:f9e52210:pedometer  Non-wakeup",
//         "value": [
//          {
//           "intVal": 3824,
//           "mapVal": []
//          }
//         ]
//        }
//       ]
//      }
//     ]
//    },
type Bucket = {
    startTimeMillis: string
    endTimeMillis: string
    dataset: Dataset[]
}

type Dataset = {
    dataSourceId: string
    point: Point[]
}

type Point = {
    startTimeNanos: string
    endTimeNanos: string
    dataTypeName: string
    originDataSourceId: string
    value: Value[]
}

type Value = {
    intVal: number
}