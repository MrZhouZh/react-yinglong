import { ReactElement, cloneElement, useState } from "react";
import { noop } from "~/misc/util";

export type Element = ((state: boolean) => ReactElement<any>) | ReactElement<any>

const useHover = (element: Element): [ReactElement<any>, boolean] => {
  const [state, setState] = useState(false)
  const onMouseEnter = (originalOnMouseEnter?: any) => (event: any) => {
    (originalOnMouseEnter || noop)(event)
    setState(true)
  }
  const onMouseLeave = (originalOnMouseLeave?: any) => (event: any) => {
    (originalOnMouseLeave || noop)(event)
    setState(false)
  }

  if (typeof element === 'function') {
    element = element(state)
  }

  const el = cloneElement(element, {
    onMouseEnter: onMouseEnter(element.props.onMouseEnter),
    onMouseLeave: onMouseLeave(element.props.onMouseLeave),
  })

  return [el, state]
}

export default useHover
