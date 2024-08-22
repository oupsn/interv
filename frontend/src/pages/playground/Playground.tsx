import { useEffect } from "react"

const Playground = () => {
  useEffect(() => {
    const handleClose = (e: { preventDefault: () => void }) => {
      e.preventDefault()
    }

    window.addEventListener("beforeunload", handleClose)

    return () => {
      window.removeEventListener("beforeunload", handleClose)
    }
  }, [])

  return <div>beforeunload</div>
}

export default Playground
