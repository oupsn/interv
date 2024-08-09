import { FC } from "react"
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons"
import { StatusMessages } from "react-media-recorder-2"

interface VideoInterviewStatusBoxProps {
  title: string
  status: StatusMessages
  error: string
}
const videoInterviewStatusBox: FC<VideoInterviewStatusBoxProps> = ({
  title,
  status,
  error,
}) => {
  return (
    <div className={"flex gap-4 place-items-center"}>
      <div className={"rounded-full bg-iWhiteHover p-2 h-fit"}>
        {error || status != "idle" ? (
          <Cross2Icon className={"w-6 h-6"} />
        ) : (
          <CheckIcon className={"w-6 h-6"} />
        )}
      </div>
      <div>
        <p className={"font-semibold"}>{title}</p>
        <p>
          {error || status != "idle"
            ? error || "Connecting to device..."
            : "Connected"}
        </p>
      </div>
    </div>
  )
}

export default videoInterviewStatusBox
