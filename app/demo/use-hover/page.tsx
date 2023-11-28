'use client'

import { useCallback, useRef, useState } from "react"
import useHover from "~/hooks/useHover"
import useHoverDirty from "~/hooks/useHoverDirty"

export default function useHoverDemo() {
  const element = (hovered: boolean) => (
    <div>
      Hover me! {hovered && 'Thanks!'}
    </div>
  )
  const ref = useRef<HTMLDivElement | null>(null)
  const [hoverable, hovered] = useHover(element)
  const isHovered = useHoverDirty(ref)

  return (
    <div>
      {hoverable}
      <div>{hovered ? 'HOVERED' : ''}</div>

      <hr />
      useHoverDirty:
      <br />
      <div ref={ref}>{isHovered ? '🤣' : '😀'}</div>
    </div>
  )
}
