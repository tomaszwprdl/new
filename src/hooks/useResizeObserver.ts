import { useEffect, useState, RefObject } from 'react';

interface DimensionState {
  width: number | undefined;
  height: number | undefined;
}

export default function useResizeObserver(ref: RefObject<HTMLElement>) {
  const [dimensions, setDimensions] = useState<DimensionState>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(entries => {
      if (!entries[0]) return;

      const { width, height } = entries[0].contentRect;
      setDimensions({
        width,
        height
      });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return dimensions;
} 