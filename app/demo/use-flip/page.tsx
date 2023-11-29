'use client'

import { useRef, useState } from "react"
import useFlip, { type Rect } from "~/hooks/useFlip"

function shuffle<T extends unknown>(x: T[]) {
  let cloneList = x.slice(0)
  let i = cloneList.length, j: number

  while (--i) {
    j = Math.floor(Math.random() * i);
    [cloneList[j], cloneList[i]] = [cloneList[i], cloneList[j]]
  }

  return cloneList
}

export default function useFlipDemo() {
  const listRef = useRef<HTMLUListElement | null>(null)
  const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  const shuffleList = () => setItems(shuffle(items))

  const invert = (delta: Rect, elem: HTMLElement) => {
    elem.style.transform = `translate(${delta.left}px, ${delta.top}px)`
    elem.style.transition = `transform 0s`
  }

  const play = (elem: HTMLElement) => {
    elem.style.transform = `none`
    elem.style.transition = `transform 300ms ease`
  }

  // const invertAndPlay = (delta: Rect, elem: HTMLElement) => {
  //   elem.animate(
  //     [
  //       {
  //         transform: `translate(${delta.left}px, ${delta.top}px)`,
  //       },
  //       {
  //         transform: `none`,
  //       }
  //     ],
  //     { duration: 300 }
  //   )
  // }

  useFlip({
    root: listRef,
    invert,
    play,
  })

  return (
    <>
      <button onClick={shuffleList}>shuffle</button>
      <ul ref={listRef}>
        {items.map((item) => (
          <li data-key={item} key={item} className="inline-block p-2">{item}</li>
        ))}
      </ul>
    </>
  )
}
