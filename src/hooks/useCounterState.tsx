'use client';

import { type ReactNode, createContext, useContext, useState, useEffect } from "react";
import { BlockType } from "~/app/_components/Block";

type Theme = 'light' | 'dark';
type CounterState = {
  blockType: BlockType;
  blockCount: number;
  currentIndexes: number[];
  range: number[];
  theme: Theme;
};

type HelperFunctions = {
  computeRange: () => void,
  clearIndexes: () => void,
  setTheme: (theme: Theme) => void,
}
type CounterStateContextType = [CounterState, (updatedState: Partial<CounterState>) => void, HelperFunctions];
const CounterStateContext = createContext<CounterStateContextType | null>(null);

export const CounterStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CounterState>({ blockType: 'binary', currentIndexes: [0], blockCount: 1, range: [0, 1], theme: "light" });

  function updateState(updatedState: Partial<CounterState>) {
    setState((prevState) => ({ ...prevState, ...updatedState }));
  }

  useEffect(() => {
    computeRange();
    computeTheme();
  }, []);

  useEffect(() => {
    computeRange();
  }, [state.blockType]);

  // computes the range and sets it based on state.blockType
  function computeRange() {
    switch (state.blockType) {
      case 'binary':
        updateState({ range: [0, 1] });
        break;
      case 'octal':
        updateState({ range: [0, 1, 2, 3, 4, 5, 6, 7] });
        break;
      case 'decimal':
        updateState({ range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] });
        break;
      case 'hexadecimal':
        updateState({ range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] });
        break;
      default:
        updateState({ range: [0, 1] });
        break;
    };
  }

  /// resets indexes to the minimum.
  function clearIndexes() {
    const rangeMin = state.range[0]!;
    let newIndexes = Array.from<number>({ length: state.blockCount }).fill(rangeMin);
    updateState({ currentIndexes: newIndexes });
  }

  // computes the theme based on the user's preference.
  function computeTheme() {
    let mode: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    let localTheme = localStorage.getItem('theme') as Theme;
    if (localTheme && (localTheme === 'light' || localTheme === 'dark')) {
      mode = localTheme;
    }
    setTheme(mode);
  }
  // set the theme.
  function setTheme(theme: Theme) {
    document.documentElement.classList.remove(state.theme);
    document.documentElement.classList.add(theme);
    updateState({ theme: theme });
    localStorage.setItem('theme', theme);
  }

  return (
    <CounterStateContext.Provider value={[state, updateState, { computeRange: computeRange, clearIndexes: clearIndexes, setTheme: setTheme }]}>
      {children}
    </CounterStateContext.Provider>
  );
};

export const useCounterState = () => {
  const context = useContext(CounterStateContext);
  if (!context) {
    throw new Error("useCounterState must be used within a CounterStateProvider");
  }
  return context;
};
