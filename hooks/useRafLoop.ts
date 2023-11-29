import { useCallback, useEffect, useMemo, useRef } from "react"

export type RafLoopReturns = [() => void, () => void, () => boolean]

const useRafLoop = (callback: FrameRequestCallback, initiallyActive = true): RafLoopReturns => {
  const raf = useRef<ReturnType<typeof requestAnimationFrame> | null>(null)
  const rafActivity = useRef(false)
  const rafCallback = useRef(callback)
  rafCallback.current = callback

  const step = useCallback((time: number) => {
    if (rafActivity.current) {
      rafCallback.current(time)
      raf.current = requestAnimationFrame(step)
    }
  }, [])

  const result = useMemo(() => {
    return [
      () => {
        // stop
        if (rafActivity.current) {
          rafActivity.current = false
          raf.current && cancelAnimationFrame(raf.current)
        }
      },
      () => {
        // start
        if (!rafActivity.current) {
          rafActivity.current = true
          raf.current = requestAnimationFrame(step)
        }
      },
      () => rafActivity.current,
    ] as RafLoopReturns
  }, [])

  useEffect(() => {
    if (initiallyActive) {
      result[1]()
    }

    return result[0]
  }, [])

  return result
}

export default useRafLoop
