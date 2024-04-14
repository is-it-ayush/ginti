'use client';

import { useCounterState } from "~/hooks/useCounterState";
import { RangeRenderer } from "./RangeRenderer";

interface BlockRendererProps {
}

export const BlockRenderer = ({ }: BlockRendererProps) => {
  const [counterState, _] = useCounterState();

  return (
    <div className="absolute top-1/2 flex flex-row-reverse justify-center gap-4 w-[80vw]">
      {
        Array.from({ length: counterState.blockCount }).map((_, index) => (
            <RangeRenderer key={`${index}-${counterState.currentIndexes[index]}`} rangeIndex={index} />
        ))
      }
    </div>
  )
}
