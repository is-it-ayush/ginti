import { CounterStateProvider } from "~/hooks/useCounterState";
import { ControlPanel } from "./_components/ControlPanel";
import { BlockRenderer } from "./_components/BlockRenderer";
import { NumberView } from "./_components/NumberView";

export default function HomePage() {
  return (
    <main className="flex items-center justify-center bg-white dark:bg-black min-h-screen max-w-screen">
      <CounterStateProvider>
        <ControlPanel />
        <BlockRenderer />
        <NumberView />
      </CounterStateProvider>
    </main>
  );
}
