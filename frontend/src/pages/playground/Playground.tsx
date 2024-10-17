import { useEffect } from "react"

const Playground = () => {
  useEffect(() => {
    const handleClose = (e: {
      preventDefault: () => void
      returnValue: string
    }) => {
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
