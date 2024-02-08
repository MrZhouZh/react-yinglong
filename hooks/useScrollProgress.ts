import { useEffect, useRef, useState } from "react"
import { off, on } from "~/misc/util";

function getOffsetTop(element: HTMLElement | null) {
  let offsetTop = 0;
  while(element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent as HTMLElement;
  }

  return offsetTop;
}

/**
 * scroll parcelled
 */
const useScrollProgress = <T extends HTMLElement>() => {
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<T>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = scrollRef.current;
      if (element) {
        const scrollPosition = document.documentElement.scrollTop;
        const topOfElement = getOffsetTop(element);
        const heightOfElement = element.offsetHeight;
        const viewportHeight = window.innerHeight;
        const percent =
          (scrollPosition - topOfElement + viewportHeight) /
          (heightOfElement + viewportHeight);
        const clamped = Math.max(0, Math.min(1, percent));

        setProgress(clamped);
      }
    }

    handleScroll();

    on(window, 'scroll', handleScroll);
    return () => {
      off(window, 'scroll', handleScroll);
    }
  }, [scrollRef]);

  return { progress, scrollRef };
}

export default useScrollProgress;
