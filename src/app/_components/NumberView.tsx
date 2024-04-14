'use client';

import { useCounterState } from '~/hooks/useCounterState';
import { hexaMap } from './Block';

export const NumberView = () => {
  const [counterState] = useCounterState();

  function convertFromBaseNTo10(num: number[], base: number): number {
    let decimal = 0;
    switch (base) {
      case 8:
      case 2:
        for (let i = 0; i < num.length; i++) {
          if (base === 2 && num[i] !== 0 && num[i] !== 1) {
            throw new Error('Invalid binary number.');
          }
          if (base === 8 && (Number(num[i]) < 0 || Number(num[i]) > 7)) {
            throw new Error('Invalid octal number.');
          }
          decimal += Number(num[i]) * Math.pow(base, i);
        }
        break;
      case 10:
        const tmp = [...num];
        tmp.reverse();
        decimal = Number(tmp.join(''));
        break;
      case 16:
        for (let i = 0; i < num.length; i++) {
          const value = Number(num[i]);
          if (value < 0 || value > 15) {
            throw new Error('Invalid hexadecimal number.');
          }
          decimal += value * Math.pow(base, i);
        }
        break;
    }
    return decimal;
  }

  function getCurrentBase(): number {
    switch (counterState.blockType) {
      case 'binary':
        return 2;
      case 'octal':
        return 8;
      case 'decimal':
        return 10;
      case 'hexadecimal':
        return 16;
      default:
        return 10;
    }
  }

  function getJoinedIndexesForDisplay(): string {
    let value = '',
      tmp = [];
    switch (counterState.blockType) {
      case 'decimal':
      case 'octal':
      case 'binary':
        tmp = [...counterState.currentIndexes];
        value = tmp.reverse().join('');
        break;
      case 'hexadecimal':
        tmp = [
          ...counterState.currentIndexes.map((index) => {
            if (index < 10) {
              return index;
            }
            return hexaMap[index];
          }),
        ];
        value = tmp.reverse().join('');
        break;
      default:
        value = counterState.currentIndexes.join('');
        break;
    }
    return value;
  }

  function getJoinedRangeForDisplay(): string {
    let value = '';
    switch (counterState.blockType) {
      case 'decimal':
      case 'octal':
      case 'binary':
        value = counterState.range.join(' : ');
        break;
      case 'hexadecimal':
        value = counterState.range
          .map((index) => {
            if (index < 10) {
              return index;
            }
            return hexaMap[index];
          })
          .join(' : ');
        break;
    }
    return value;
  }

  return (
    <div className="fixed left-1/2 top-5 z-10 flex w-[90vw] -translate-x-1/2 flex-col gap-4 p-8 font-normal text-gray-700 drop-shadow-lg backdrop-blur-[20px] dark:text-gray-200 lg:items-center lg:justify-center">
      <span className="text-2xl text-black dark:text-white lg:text-4xl">
        {convertFromBaseNTo10(counterState.currentIndexes, getCurrentBase())}
      </span>
      <div className="flex flex-row gap-4 text-sm lg:text-base">
        <span className="">{counterState.blockType}</span>
        <span className="text-gray-700 dark:text-gray-200">|</span>
        <span className="">{counterState.blockCount} blocks</span>
        <span className="text-gray-700 dark:text-gray-200">|</span>
        <span className="break-all">{getJoinedIndexesForDisplay()}</span>
      </div>
      <span>{getJoinedRangeForDisplay()}</span>
    </div>
  );
};
