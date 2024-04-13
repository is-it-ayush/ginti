'use client';

import { useCounterState } from "~/hooks/useCounterState";
import { BlockType } from "./Block";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/HoverCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/Tooltip"
import Link from "next/link";

const blockTypes: Record<BlockType, string> = {
  binary: 'binary',
  octal: 'octal',
  decimal: 'decimal',
  hexadecimal: 'hexadecimal',
};

const blockDescriptions: Record<BlockType, string> = {
  binary: 'Binary is a base-2 number system that uses two symbols: 0 and 1.',
  octal: 'Octal is a base-8 number system that uses eight symbols: 0-7.',
  decimal: 'Decimal is a base-10 number system that uses ten symbols: 0-9.',
  hexadecimal: 'Hexadecimal is a base-16 number system that uses sixteen symbols: 0-9, A-F.',
};

export const ControlPanel = () => {
  const [counterState, setCounterState, { clearIndexes, setTheme }] = useCounterState();

  // handleAdd will increment the current indexes.
  // loop:
  // 1. Start at the first index.
  // 2. - If the first index value === rangeMax, we need to move onto index + 1.
  //    - if the first index value < rangeMax, we increment it.
  // 3. Store the value
  function handleAdd() {
    const currentIndexes = counterState.currentIndexes;
    const rangeMax = counterState.range[counterState.range.length - 1];
    const rangeMin = counterState.range[0];
    if (rangeMax == undefined || rangeMin == undefined) {
      throw new DOMException("Range was improperly initialized. Could not find min and max.");
    }
    adder: for (let i = 0; i < currentIndexes.length; i++) {
      switch (true) {
        case currentIndexes[i]! < rangeMax:
          currentIndexes[i] += 1;
          break adder;
        case currentIndexes[i] === rangeMax:
          currentIndexes[i] = rangeMin;
          continue adder;
        default:
          break adder;
      }
    }
    setCounterState({ currentIndexes: currentIndexes });
  }
  // handleSubtract will decrement the current indexes.
  // loop:
  // 1. Start at the first index.
  // 2. - If the first index value === rangeMin, we need to move onto index + 1.
  //    - if the first index value > rangeMin, we decrement it.
  // 3. Store the value
  function handleSubtract() {
    const currentIndexes = counterState.currentIndexes;
    const rangeMax = counterState.range[counterState.range.length - 1];
    const rangeMin = counterState.range[0];
    if (rangeMax == undefined || rangeMin == undefined) {
      throw new DOMException("Range was improperly initialized. Could not find min and max.");
    }
    subtract: for (let i = 0; i < currentIndexes.length; i++) {
      switch (true) {
        case currentIndexes[i]! > rangeMin:
          currentIndexes[i] -= 1;
          break subtract;
        case currentIndexes[i] === rangeMin:
          currentIndexes[i] = rangeMax;
          continue subtract;
        default:
          break subtract;
      }
    }
    setCounterState({ currentIndexes: currentIndexes });
  }

  // handleBlockAdd will add a block to the current indexes.
  function handleBlockAdd() {
    setCounterState({ blockCount: counterState.blockCount + 1, currentIndexes: [...counterState.currentIndexes, 0] });
  }
  // handleBlockSubtract will subtract a block from the current indexes.
  function handleBlockSubtract() {
    setCounterState({ blockCount: counterState.blockCount - 1, currentIndexes: counterState.currentIndexes.slice(0, -1) });
  }
  // handleBlockTypeChange will change the block type and reset the indexes.
  function handleBlockTypeChange(type: BlockType) {
    setCounterState({ blockType: type });
    clearIndexes();
  }

  return (
    <div className="z-10 w-[90vw] fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-center rounded-lg p-8 drop-shadow-lg backdrop-blur-[20px] text-gray-600 dark:text-gray-400 font-normal select-none">
      <span className="lg:hidden font-semibold text-black dark:text-white">crafted by <Link target="_blank" className="underline" href={'https://isitayush.dev'}>ayush</Link> 💙</span>
      <span className="text-4xl font-semibold text-black dark:text-white">controls.</span>
      <div className="flex flex-row lg:flex-col gap-4">
        {Object.values(blockTypes).map((blockType) => (
          <TooltipProvider key={`btn-${blockType}`}>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200" onClick={() => handleBlockTypeChange(blockType as BlockType)}>{blockType}</TooltipTrigger>
              <TooltipContent>
                <p>{blockDescriptions[blockType as BlockType]}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <div className="flex flex-row lg:flex-col gap-4">
        <TooltipProvider key={`btn-add`}>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200" onClick={handleAdd}>add +</TooltipTrigger>
            <TooltipContent>
              <p>Increment the counter.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider key={`btn-subtract`}>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200" onClick={handleSubtract}>subtract -</TooltipTrigger>
            <TooltipContent>
              <p>Decrement the counter.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-row lg:flex-col gap-4">
        <TooltipProvider key={`btn-block-add`}>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200" onClick={handleBlockAdd}>block add +</TooltipTrigger>
            <TooltipContent>
              <p>Add a block.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider key={`btn-block-subtract`}>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200" onClick={handleBlockSubtract}>block subtract -</TooltipTrigger>
            <TooltipContent>
              <p>Remove a block.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <TooltipProvider key={`btn-reset`}>
        <Tooltip>
          <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200" onClick={clearIndexes}>reset</TooltipTrigger>
          <TooltipContent>
            <p>Reset the counter.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ul className="flex flex-row lg:flex-col gap-4 list-none">
        <TooltipProvider key={`btn-light`}>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200" onClick={() => setTheme("light")}>light</TooltipTrigger>
            <TooltipContent>
              <p>Light Theme.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider key={`btn-light`}>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200" onClick={() => setTheme("dark")}>dark</TooltipTrigger>
            <TooltipContent>
              <p>Dark Theme.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ul>
      <span className="hidden lg:block font-semibold text-black dark:text-white">crafted by <Link target="_blank" className="underline" href={'https://isitayush.dev'}>ayush</Link> 💙</span>
    </div>
  )
}
