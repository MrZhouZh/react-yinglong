import { useRef } from "react"

const useLatest = <T>(value: T) => {
  const ref = useRef(value)
  // update the ref each render so if it change the newest callback will be invoked.
  ref.current = value
  return ref
}

export default useLatest
