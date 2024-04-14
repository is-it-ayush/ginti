'use client';

import { useCounterState } from "~/hooks/useCounterState";
import { BlockType } from "./Block";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/Tooltip"
import { Plus, Minus, RotateCcw, PackagePlus, PackageMinus, Sun, Moon } from 'lucide-react';
import useSound from "use-sound";
import Link from "next/link";
import { useIsMobile } from "~/hooks/useIsMobile";


const CLICK_SOUND_CHANCE = 0.5;
const MAX_BLOCK_MOBILE = 4;
const MAX_BLOCK_DESKTOP = 12;

const blockDescriptions: Record<BlockType, string> = {
  binary: 'Binary is a base-2 number system that uses two symbols: 0 and 1.',
  octal: 'Octal is a base-8 number system that uses eight symbols: 0-7',
  decimal: 'Decimal is a base-10 number system that uses ten symbols: 0-9',
  hexadecimal: 'Hexadecimal is a base-16 number system that uses sixteen symbols: 0-9, A-F',
};

export const ControlPanel = () => {
  const [counterState, setCounterState, { clearIndexes, setTheme }] = useCounterState();
  const isMobile = useIsMobile();
  const [play] = useSound("/sounds/click2.mp3", {
    sprite: {
      t1: [48, 76],
      t2: [215, 239]
    }
  });

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
    play({ id: Math.random() > CLICK_SOUND_CHANCE ? 't1' : 't2' });
    setCounterState({ currentIndexes: currentIndexes });
  }
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
    play({ id: Math.random() > 0.5 ? 't1' : 't2' });
    setCounterState({ currentIndexes: currentIndexes });
  }

  // handleBlockAdd will add a block to the current indexes.
  function handleBlockAdd() {
    console.log(`blockCount: ${counterState.blockCount} | isMobile: ${isMobile}`);
    if (isMobile && counterState.blockCount >= MAX_BLOCK_MOBILE) return;
    if (!isMobile && counterState.blockCount >= MAX_BLOCK_DESKTOP) return;
    setCounterState({ blockCount: counterState.blockCount + 1, currentIndexes: [...counterState.currentIndexes, 0] });
  }
  // handleBlockSubtract will subtract a block from the current indexes.
  function handleBlockSubtract() {
    if (counterState.blockCount <= 1) return;
    setCounterState({ blockCount: counterState.blockCount - 1, currentIndexes: counterState.currentIndexes.slice(0, -1) });
  }

  // switchBlockType will switch the block type.c
  function switchBlockType() {
    setCounterState({ currentIndexes: Array.from({ length: counterState.blockCount }, () => 0) }); // prevent overflow when switching block types.
    switch (counterState.blockType) {
      case 'binary':
        setCounterState({ blockType: 'octal' });
        break;
      case 'octal':
        setCounterState({ blockType: 'decimal' });
        break;
      case 'decimal':
        setCounterState({ blockType: 'hexadecimal' });
        break;
      case 'hexadecimal':
        setCounterState({ blockType: 'binary' });
        break;
    }
  }

  // switchTheme will switch the theme.
  function switchTheme() {
    switch (counterState.theme) {
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('light');
        break;
    }
  }

  return (
    <div className="z-10 w-[90vw] fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-center rounded-lg p-8 drop-shadow-lg backdrop-blur-[20px] text-gray-600 dark:text-gray-400 font-normal select-none">
      <div className="flex flex-row gap-4 justify-between lg:justify-normal w-full lg:w-fit">
        <span className="text-4xl font-semibold text-black dark:text-white">ginti.</span>
        <TooltipProvider key={`btn-blockType`}>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200" onClick={switchBlockType}>{counterState.blockType}</TooltipTrigger>
            <TooltipContent>
              <p>{blockDescriptions[counterState.blockType]}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-row gap-6 text-sm lg:text-base">
        <div className="flex flex-row gap-4">
          <TooltipProvider key={`btn-add`}>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200 p-2" onClick={handleAdd}><Plus className="w-4 h-4 lg:w-6 lg:h-6" /></TooltipTrigger>
              <TooltipContent>
                <p>increment the counter.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider key={`btn-subtract`}>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200 p-2" onClick={handleSubtract}><Minus className="w-4 h-4 lg:w-6 lg:h-6" /></TooltipTrigger>
              <TooltipContent>
                <p>decrement the counter.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-row gap-4">
          <TooltipProvider key={`btn-block-add`}>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200 p-2" onClick={handleBlockAdd}><PackagePlus className="w-4 h-4 lg:w-6 lg:h-6" /></TooltipTrigger>
              <TooltipContent>
                <p>add a block.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider key={`btn-block-subtract`}>
            <Tooltip>
              <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200 p-2" onClick={handleBlockSubtract}><PackageMinus className="w-4 h-4 lg:w-6 lg:h-6" /></TooltipTrigger>
              <TooltipContent>
                <p>remove a block.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <TooltipProvider key={`btn-reset`}>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200 p-2" onClick={clearIndexes}><RotateCcw className="w-4 h-4 lg:w-6 lg:h-6" /></TooltipTrigger>
            <TooltipContent>
              <p>reset the counter.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider key={`btn-light`}>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 duration-200 p-2" onClick={() => switchTheme()}>{counterState.theme === 'light' ? <Sun className="w-4 h-4 lg:w-6 lg:h-6" /> : <Moon className="w-4 h-4 lg:w-6 lg:h-6" />}</TooltipTrigger>
            <TooltipContent>
              <p>{counterState.theme} theme.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span className="font-normal text-black dark:text-white">crafted by <Link target="_blank" className="underline" href={'https://x.com/is_it_ayush'}>ayush</Link> 💙</span>
    </div>
  )
}
