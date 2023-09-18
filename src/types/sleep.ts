// "bucket": [
//     {
//      "startTimeMillis": "1694793600000",
//      "endTimeMillis": "1694966400000",
//      "dataset": [
//       {
//        "dataSourceId": "derived:com.google.sleep.segment:com.google.android.gms:merged",
//        "point": [
//         {
//          "startTimeNanos": "1694863439151585792",
//          "endTimeNanos": "1694866409151585792",
//          "dataTypeName": "com.google.sleep.segment",
//          "originDataSourceId": "derived:com.google.sleep.segment:com.google.fitkit:apple:iphone:a1f38427:session_local_data",
//          "value": [
//           {
//            "intVal": 2,
//            "mapVal": []
//           }
//          ]
//         },

export type Sleep = {
    bucket: Bucket[]
}

export type Bucket = {
    startTimeMillis: string
    endTimeMillis: string
    dataset: Dataset[]
}

export type Dataset = {
    dataSourceId: string
    point: Point[]
}

export type Point = {
    startTimeNanos: string
    endTimeNanos: string
    dataTypeName: string
    originDataSourceId: string
    value: Value[]
}

export type Value = {
    intVal: number
    mapVal: any[]
}
