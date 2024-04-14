'use client';

import { useCounterState } from '~/hooks/useCounterState';

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

interface BlockProps {
  value: number;
  rangeIndex: number;
}

export const Block = ({ value, rangeIndex }: BlockProps) => {
  const [counterState] = useCounterState();
  // internally, i will convert the number to the corresponding hexadecimal display.
  // this will reduce the complexity when trying to track and manage the display state.
  function computeHexaDisplay(value: number): string {
    let returnValue: string | undefined;
    if (value < 10) {
      returnValue = counterState.range[value]?.toString();
    } else {
      returnValue = hexaMap[value];
    }
    return returnValue ?? '';
  }

  return (
    <div
      data-active={value === counterState.currentIndexes[rangeIndex]}
      className="flex h-16 w-16 items-center justify-center rounded-xl bg-black/5 shadow-md shadow-black/5 data-[active=false]:opacity-20 dark:bg-white/5 dark:shadow-white/5"
    >
      <span className="font-mono text-3xl font-normal text-black dark:text-white lg:text-6xl">
        {counterState.blockType === 'hexadecimal'
          ? computeHexaDisplay(value)
          : value}
      </span>
    </div>
  );
};
