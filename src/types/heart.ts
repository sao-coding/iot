// "bucket": [
//     {
//      "startTimeMillis": "1694448000000",
//      "endTimeMillis": "1694534400000",
//      "dataset": [
//       {
//        "dataSourceId": "derived:com.google.heart_rate.summary:com.google.android.gms:aggregated",
//        "point": [
//         {
//          "startTimeNanos": "1694448000000000000",
//          "endTimeNanos": "1694530800000000000",
//          "dataTypeName": "com.google.heart_rate.summary",
//          "originDataSourceId": "derived:com.google.heart_rate.bpm:com.google.android.gms:resting_heart_rate<-merge_heart_rate_bpm",
//          "value": [
//           {
//            "fpVal": 52.630434782608695,
//            "mapVal": []
//           },
//           {
//            "fpVal": 53,
//            "mapVal": []
//           },
//           {
//            "fpVal": 52,
//            "mapVal": []
//           }
//          ]
//         }
//        ]
//       }
//      ]
//     },

export type Heart = {
  bucket: Bucket[]
}

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
  fpVal: number
  mapVal: any[]
}
