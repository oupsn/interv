import { cn } from "@/lib/utils"
import { FaDesktop, FaVideo } from "react-icons/fa"

function CodingResultRecordItem({
  isVideoRequired,
  isScreenRequired,
  videoUrl,
  screenUrl,
}: {
  isVideoRequired: boolean
  isScreenRequired: boolean
  videoUrl: string | null
  screenUrl: string | null
}) {
  return (
    <>
      <div
        className={cn(
          "flex flex-row w-full",
          !isVideoRequired && !isScreenRequired && "justify-start",
          (isVideoRequired || isScreenRequired) && "justify-around",
        )}
      >
        {!isVideoRequired && !isScreenRequired && (
          <div className="flex flex-col gap-2">
            <h3 className="text-md">
              This workspace does not require any record
            </h3>
          </div>
        )}

        {videoUrl && videoUrl !== "" && isVideoRequired && (
          <div className="flex flex-col gap-2 items-center">
            <video controls className="rounded-xl h-64">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="flex flex-row gap-2 items-center">
              <FaVideo className="text-primary" />
              <h3 className="text-md">Video Record</h3>
            </div>
          </div>
        )}
        {screenUrl && screenUrl !== "" && isScreenRequired && (
          <div className="flex flex-col gap-2 items-center">
            <video controls className="rounded-xl h-64">
              <source src={screenUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="flex flex-row gap-2 items-center">
              <FaDesktop className="text-primary" />
              <h3 className="text-lg ">Screen Record</h3>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CodingResultRecordItem
