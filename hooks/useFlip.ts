import { RefObject, useLayoutEffect, useRef } from "react"

export interface Rect {
  top: number
  left: number
  width: number
  height: number
}

export interface FlipHooksProps {
  root: RefObject<HTMLElement>
  // invertAndPlay: (delta: Rect, elem: HTMLElement) => void
  invert: (delta: Rect, elem: HTMLElement) => void
  play: (elem: HTMLElement) => void
}

const getDelta = (start: DOMRect, target: DOMRect): Rect => ({
  top: start.top - target.top,
  left: start.left - target.left,
  width: start.width / target.width,
  height: start.height / target.height,
})

const isZero = (delta: Rect) =>
  delta.top === 0 &&
  delta.left === 0 &&
  delta.width === 1 &&
  delta.height === 1

const useFlip = ({ root, invert, play }: FlipHooksProps) => {
  const origins = useRef<{ [key: string]: DOMRect}>({})
  let firstRun = useRef(true)

  useLayoutEffect(() => {
    if (root.current === null) return
    const list = root.current
    const children: HTMLElement[] = Array.prototype.slice.call(list.children)

    for (const child of children) {
      const key = child.dataset.key!;

      const next = child.getBoundingClientRect()
      if (!firstRun.current) {
        if (key in origins.current) {
          const previous = origins.current[key]
          const delta = getDelta(previous, next)
          if (!isZero(delta)) {
            invert(delta, child)

            requestAnimationFrame(() => {
              play(child)
            })
          }
        }
      }
      origins.current[child.dataset.key!] = next
    }

    firstRun.current = false
  }, [root, invert, play])
};

export default useFlip
