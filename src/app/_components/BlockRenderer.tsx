'use client';

import { useCounterState } from '~/hooks/useCounterState';
import { RangeRenderer } from './RangeRenderer';

export const BlockRenderer = () => {
  const [counterState] = useCounterState();

  return (
    <div className="absolute top-1/2 flex w-[80vw] flex-row-reverse justify-center gap-4">
      {Array.from({ length: counterState.blockCount }).map((_, index) => (
        <RangeRenderer
          key={`${index}-${counterState.currentIndexes[index]}`}
          rangeIndex={index}
        />
      ))}
    </div>
  );
};
