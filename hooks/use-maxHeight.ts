/**
 * Custom hook to calculate maxHeight as window.innerHeight - offset
 * @param offset - number of pixels to subtract (e.g., header/footer height)
 * @returns maxHeight in pixels (number) or undefined during SSR/first render
 */

import { useState, useEffect } from "react";

export default function useMaxHeight(offset: number = 0): string | undefined {
  const [maxHeight, setMaxHeight] = useState<string>();

  useEffect(() => {
    function handleResize() {
      setMaxHeight(`${window.innerHeight - offset}px`);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [offset]);

  return maxHeight;
}