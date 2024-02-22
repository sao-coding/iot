"use client"

import { useEffect, useState } from "react"
import cx from "classix"

import { Device } from "@/types"
import { Listbox } from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/24/solid"

import Aircon from "./aircon"
import Fan from "./fan"
import TV from "./tv"

const IRremotePage = () => {
  const [deviceList, setDeviceList] = useState<Device[]>([])

  const [selectedDevice, setSelectedDevice] = useState<Device>({
    device: "unknown",
    name: "選擇設備"
  })

  useEffect(() => {
    const getDevices = async () => {
      const response = await fetch("/api/devices-list")
      const devices = await response.json()
      setDeviceList(devices)
    }
    getDevices()
  }, [])

  const handleSelect = (value: Device) => {
    console.log(value.name)
    setSelectedDevice(value)
  }

  return (
    <div className='h-full p-2'>
      <div className='flex items-center justify-center'>
        <div className='relative flex flex-col items-center p-4'>
          <Listbox value={selectedDevice} onChange={(value) => handleSelect(value)}>
            <Listbox.Button className='m-1 flex w-28 items-center justify-between rounded-lg bg-white px-1 py-1'>
              {selectedDevice.name}
              <ChevronUpDownIcon className='h-6 w-6' />
            </Listbox.Button>
            <Listbox.Options className='absolute top-14 w-28 rounded-lg bg-white p-2 shadow-md'>
              {/* 輸出冷氣 */}
              <Listbox.Label className='mb-1 block w-full border-b font-bold'>冷氣</Listbox.Label>
              {deviceList
                .filter((device) => device.device === "aircon")
                .map((device) => (
                  <Listbox.Option key={device.name} value={device}>
                    {({ selected }) => (
                      <div
                        className={cx(
                          "cursor-pointer rounded-md px-1 hover:bg-gray-200",
                          selected && "bg-gray-200"
                        )}
                      >
                        {device.name}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              {/* 輸出電風扇 */}
              <Listbox.Label className='mb-1 block w-full border-b pt-1 font-bold'>
                電風扇
              </Listbox.Label>
              {deviceList
                .filter((device) => device.device === "fan")
                .map((device) => (
                  <Listbox.Option key={device.name} value={device}>
                    {({ selected }) => (
                      <div
                        className={cx(
                          "cursor-pointer rounded-md px-1 hover:bg-gray-200",
                          selected && "bg-gray-200"
                        )}
                      >
                        {device.name}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              {/* 輸出電視 */}
              <Listbox.Label className='mb-1 block w-full border-b pt-1 font-bold'>
                電視
              </Listbox.Label>
              {deviceList
                .filter((device) => device.device === "tv")
                .map((device) => (
                  <Listbox.Option key={device.name} value={device}>
                    {({ selected }) => (
                      <div
                        className={cx(
                          "cursor-pointer rounded-md px-1 hover:bg-gray-200",
                          selected && "bg-gray-200"
                        )}
                      >
                        {device.name}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
      {/* 若是冷氣 <Aircon /> 若是電風扇 <Fan /> 若是電視 <TV /> */}
      {selectedDevice.name !== "選擇設備" && (
        <>
          {selectedDevice.device === "aircon" && <Aircon device={selectedDevice} />}
          {selectedDevice.device === "fan" && <Fan device={selectedDevice} />}
          {selectedDevice.device === "tv" && <TV device={selectedDevice} />}
        </>
      )}
    </div>
  )
}

export default IRremotePage
