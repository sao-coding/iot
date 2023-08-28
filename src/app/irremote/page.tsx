"use client"

import { useState, useEffect } from "react"
import { Listbox } from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/24/solid"
import cx from "classix"
import Aircon from "./aircon"
import Fan from "./fan"
import TV from "./tv"
import { Device } from "@/types"

const IRremotePage = () => {
    const [deviceList, setDeviceList] = useState<Device[]>([])

    const [selectedDevice, setSelectedDevice] = useState<Device>({
        device: "unknown",
        name: "選擇設備",
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
        <div className='p-2 h-full'>
            <div className='flex justify-center items-center'>
                <div className='flex flex-col items-center p-4 relative'>
                    <Listbox value={selectedDevice} onChange={(value) => handleSelect(value)}>
                        <Listbox.Button className='bg-white rounded-lg py-1 px-1 m-1 flex items-center justify-between w-28'>
                            {selectedDevice.name}
                            <ChevronUpDownIcon className='h-6 w-6' />
                        </Listbox.Button>
                        <Listbox.Options className='bg-white shadow-md p-2 rounded-lg w-28 absolute top-14'>
                            {/* 輸出冷氣 */}
                            <Listbox.Label className='font-bold w-full block border-b mb-1'>
                                冷氣
                            </Listbox.Label>
                            {deviceList
                                .filter((device) => device.device === "aircon")
                                .map((device) => (
                                    <Listbox.Option key={device.name} value={device}>
                                        {({ selected }) => (
                                            <div
                                                className={cx(
                                                    "cursor-pointer px-1 rounded-md hover:bg-gray-200",
                                                    selected && "bg-gray-200"
                                                )}
                                            >
                                                {device.name}
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            {/* 輸出電風扇 */}
                            <Listbox.Label className='font-bold w-full block border-b pt-1 mb-1'>
                                電風扇
                            </Listbox.Label>
                            {deviceList
                                .filter((device) => device.device === "fan")
                                .map((device) => (
                                    <Listbox.Option key={device.name} value={device}>
                                        {({ selected }) => (
                                            <div
                                                className={cx(
                                                    "cursor-pointer px-1 rounded-md hover:bg-gray-200",
                                                    selected && "bg-gray-200"
                                                )}
                                            >
                                                {device.name}
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            {/* 輸出電視 */}
                            <Listbox.Label className='font-bold w-full block border-b pt-1 mb-1'>
                                電視
                            </Listbox.Label>
                            {deviceList
                                .filter((device) => device.device === "tv")
                                .map((device) => (
                                    <Listbox.Option key={device.name} value={device}>
                                        {({ selected }) => (
                                            <div
                                                className={cx(
                                                    "cursor-pointer px-1 rounded-md hover:bg-gray-200",
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
