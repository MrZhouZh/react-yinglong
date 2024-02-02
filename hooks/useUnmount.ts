import useEffectOnce from "./useEffectOnce"
import useLatest from "./useLatest"

// 适用于 client side
const useUnmount = (fn: () => any) => {
  const fnRef = useLatest(fn)

  useEffectOnce(() => () => fnRef.current())
}

export default useUnmount
