import { FaDesktop, FaVideo } from "react-icons/fa"

function CodingResultRecordItem({
  videoUrl,
  screenUrl,
}: {
  videoUrl: string | null
  screenUrl: string | null
}) {
  return (
    <>
      <div className="flex flex-row justify-around w-full">
        <div className="flex flex-col gap-2 items-center">
          {videoUrl && (
            <video controls className="rounded-xl h-64">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="flex flex-row gap-2 items-center">
            <FaVideo className="text-primary" />
            <h3 className="text-md">Video Record</h3>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          {screenUrl && (
            <video controls className="rounded-xl h-64">
              <source src={screenUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="flex flex-row gap-2 items-center">
            <FaDesktop className="text-primary" />
            <h3 className="text-lg ">Screen Record</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default CodingResultRecordItem
