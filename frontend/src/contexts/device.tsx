import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react"

interface DeviceType {
  selectedCameraId: string
  selectedMicrophoneId: string
  setSelectedCameraId: Dispatch<SetStateAction<string>>
  setSelectedMicrophoneId: Dispatch<SetStateAction<string>>
  videoDevices: MediaDeviceInfo[]
  audioDevices: MediaDeviceInfo[]
  fetchDevice: () => void
}

export const DeviceContext = createContext<DeviceType>({
  selectedCameraId: "",
  selectedMicrophoneId: "",
  setSelectedCameraId: (value) => value,
  setSelectedMicrophoneId: (value) => value,
  videoDevices: [],
  audioDevices: [],
  fetchDevice: () => null,
})

export const DeviceProvider = ({ children }: PropsWithChildren) => {
  const [selectedCameraId, setSelectedCameraId] = useState("")
  const [selectedMicrophoneId, setSelectedMicrophoneId] = useState("")
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([])
  const [isDeviceFetched, setIsDeviceFetched] = useState(false)

  const fetchDevice = async () => {
    if (!isDeviceFetched) {
      await navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(() => {
          navigator.mediaDevices.enumerateDevices().then((devices) => {
            setVideoDevices(
              devices.filter((device) => device.kind === "videoinput"),
            )
            setAudioDevices(
              devices.filter((device) => device.kind === "audioinput"),
            )
            setSelectedCameraId(
              devices.filter((device) => device.kind === "videoinput")[0]
                .deviceId,
            )
            setSelectedMicrophoneId(
              devices.filter((device) => device.kind === "audioinput")[0]
                .deviceId,
            )
          })
        })
        .finally(() => setIsDeviceFetched(true))
    }
  }

  return (
    <DeviceContext.Provider
      value={{
        selectedCameraId,
        setSelectedCameraId,
        selectedMicrophoneId,
        setSelectedMicrophoneId,
        audioDevices,
        videoDevices,
        fetchDevice,
      }}
    >
      {children}
    </DeviceContext.Provider>
  )
}
