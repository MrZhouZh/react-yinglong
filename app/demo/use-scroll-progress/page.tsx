'use client'

import useScrollProgress from "~/hooks/useScrollProgress"

export default function useScrollProgressDemo() {
  const { scrollRef, progress } = useScrollProgress<HTMLDivElement>();
  return (
    <div ref={scrollRef}>
      <div>
        <h2>Intelligence, delivered to you.</h2>
        <p>
          Get a tailored Monday morning brief directly...
          personal analyst, spotlighting essential watch...
        </p>
      </div>
      <div>
        <img src="/images/canvas-UI_1x.png" alt="" style={{ transform: `tanslateY(-${progress * 80}px)` }} />
        <img src="/images/newsletter-desktop-2_1x.png" alt="" style={{ transform: `translateY(-${progress * 240}px)` }} />
      </div>
    </div>
  )
}
