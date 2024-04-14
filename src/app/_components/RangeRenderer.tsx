'use client';

import { useCounterState } from '~/hooks/useCounterState';
import { Block } from './Block';

interface RangeRendererProps {
  rangeIndex: number;
}

export const RangeRenderer = ({ rangeIndex }: RangeRendererProps) => {
  const [counterState] = useCounterState();

  return (
    <div
      id={`rng-${rangeIndex}`}
      className={`flex flex-col items-center justify-center gap-4`}
      style={{
        transform: `translateY(-${counterState.currentIndexes[rangeIndex]! * 80}px)`,
      }}
    >
      {counterState.range.map((value, index) => (
        <Block
          key={`rng-${rangeIndex}-blk-${index}`}
          value={value}
          rangeIndex={rangeIndex}
        />
      ))}
    </div>
  );
};
