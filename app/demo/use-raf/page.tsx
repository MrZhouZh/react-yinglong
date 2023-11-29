'use client'

import { useState } from "react"
import useRaf from "~/hooks/useRaf"
import useRafLoop from "~/hooks/useRafLoop"
import useUpdate from "~/hooks/useUpdate"

export default function useRafDemo() {
  const [ticks, setTicks] = useState(0)
  const [lastCall, setLastCall] = useState(0)
  const elapsed = useRaf(5000, 1000)
  const upadte = useUpdate()

  const [loopStop, loopStart, isActive] = useRafLoop((time) => {
    setTicks(ticks => ticks + 1)
    setLastCall(time)
  })

  return (
    <div className="pl-4 pt-4">
      Elapsed: {elapsed}

      <div>RAF triggered: {ticks} (times)</div>
      <div>Last high res timestamp: {lastCall}</div>
      <br />
      <button
        className="bg-black text-white border-2 border-black p-2 rounded-md"
        onClick={() => {
          isActive() ? loopStop() : loopStart()
          upadte()
        }}
      >
        {isActive() ? 'STOP' : 'START'}
      </button>
    </div>
  )
}
