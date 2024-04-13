'use client';

import { useCounterState } from "~/hooks/useCounterState";
import { Block } from "./Block";
import { AnimatePresence } from "framer-motion";

interface BlockRendererProps {
}

export const BlockRenderer = ({ }: BlockRendererProps) => {
  const [counterState, _] = useCounterState();

  return (
    <AnimatePresence mode="wait">
      <div className="flex flex-wrap-reverse flex-row-reverse justify-start py-60 gap-4 w-[80vw]">
        {
          Array.from({ length: counterState.blockCount }).map((_, index) => (
            <Block key={`${index}-${counterState.currentIndexes[index]}`} blockIndex={index} />
          ))
        }
      </div>
    </AnimatePresence>
  )
}
