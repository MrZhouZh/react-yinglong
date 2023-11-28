'use client'

import { useCallback, useState } from "react"
import useEvent from "~/hooks/useEvent"

export default function useEventDemo() {
  const [list, setList] = useState<string[]>([])
  const onKeyDown = useCallback(({ key }: { key: string }) => {
    if (key === 'r') setList([])
    setList(oList => [...oList, key])
  }, [])
  
  useEvent('keydown', onKeyDown)
  return (
    <div>
      <p>
        Press some keys on your keyboard, <code style={{color: 'tomato'}}>r</code> key resets the list
      </p>
      <pre>
        {JSON.stringify(list, null, 4)}
      </pre>
    </div>
  )
}
