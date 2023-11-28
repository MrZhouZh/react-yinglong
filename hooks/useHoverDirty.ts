import { RefObject, useEffect, useState } from "react"
import { off, on } from "~/misc/util"

const useHoverDirty = (ref: RefObject<Element>, enabled: boolean = true) => {
  const [value, setValue] = useState(false)

  useEffect(() => {
    const onMouseOver = () => setValue(true)
    const onMouseOut = () => setValue(false)

    if (enabled && ref.current) {
      on(ref.current, 'mouseover', onMouseOver)
      on(ref.current, 'mouseout', onMouseOut)
    }

    const { current } = ref
    return () => {
      if (enabled && current) {
        off(current, 'mouseover', onMouseOver)
        off(current, 'mouseout', onMouseOut)
      }
    }
  }, [enabled, ref])

  return value
}

export default useHoverDirty
