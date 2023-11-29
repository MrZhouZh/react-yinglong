import { useState } from "react"
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect"

/**
 * 动画, 强制组件在每个 requestAnimationFrame 重新渲染, 返回经过的时间百分比
 * @param ms 毫秒, 表示重新渲染组件保持多长时间, 默认为 1e12
 * @param delay 延迟(以毫秒为单位)开始重新渲染组件, 默认为 0
 */
const useRaf = (ms: number = 1e12, delay: number = 0) => {
  const [elapsed, set] = useState(0)

  useIsomorphicLayoutEffect(() => {
    let raf: ReturnType<typeof requestAnimationFrame>
    let timerStop: ReturnType<typeof setTimeout>
    let start: number

    const onFrame = () => {
      const time = Math.min(1, (Date.now() - start) / ms)
      set(time)
      loop()
    }
    const loop = () => {
      raf = requestAnimationFrame(onFrame)
    }
    const onStart = () => {
      timerStop = setTimeout(() => {
        cancelAnimationFrame(raf)
        set(1)
      }, ms)
      start = Date.now()
      loop()
    }
    const timerDelay = setTimeout(onStart, delay);

    return () => {
      clearTimeout(timerStop)
      clearTimeout(timerDelay)
      cancelAnimationFrame(raf)
    }
  }, [ms, delay])
  return elapsed
}

export default useRaf
