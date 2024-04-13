'use client';

import { useCounterState } from "~/hooks/useCounterState";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Block Component
 * It will accept a number and then generate a range to display the number.
 */

// binary: 0-1
// octal: 0-7
// decimal: 0-9
// hexadecimal: 0-9, A-F
export type BlockType = 'binary' | 'octal' | 'decimal' | 'hexadecimal';
export const hexaMap: Record<number, string> = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F',
};
const textAnimation = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -100,
  },
  transition: {
    duration: 0.2,
  },
};

interface BlockProps {
  blockIndex: number;
}

export const Block = ({ blockIndex }: BlockProps) => {
  const [counterState, setCounterState] = useCounterState();
  // internally, i will convert the number to the corresponding hexadecimal display.
  // this will reduce the complexity when trying to track and manage the display state.
  function computeHexaDisplay(value: number): string {
    let returnValue: string | undefined;
    if (value < 10) {
      returnValue = counterState.range[value]?.toString();
    }
    else {
      returnValue = hexaMap[value];
    }
    return returnValue ?? '';
  }

  return (
    <div className="flex items-center justify-center w-16 h-16 lg:w-28 lg:h-28 bg-black/5 dark:bg-white/5 rounded-xl shadow-md shadow-black/5 dark:shadow-white/5">
      <motion.span
        initial={textAnimation.initial}
        animate={textAnimation.animate}
        exit={textAnimation.exit}
        transition={textAnimation.transition}
        className="text-black dark:text-white text-3xl lg:text-6xl font-normal font-mono"
      >
        {counterState.blockType === 'hexadecimal' ? computeHexaDisplay(counterState.currentIndexes[blockIndex] ?? 0) : counterState.currentIndexes[blockIndex]}
      </motion.span>
    </div>
  );
}
