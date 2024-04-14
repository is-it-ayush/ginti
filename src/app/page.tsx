import { CounterStateProvider } from "~/hooks/useCounterState";
import { ControlPanel } from "./_components/ControlPanel";
import { BlockRenderer } from "./_components/BlockRenderer";
import { NumberView } from "./_components/NumberView";
import { Page } from "~/components/ui/Page";

export default function HomePage() {
  return (
    <Page className="flex relative items-center justify-center bg-white dark:bg-black min-h-screen max-w-screen overflow-y-scroll">
      <CounterStateProvider>
        <ControlPanel />
        <BlockRenderer />
        <NumberView />
      </CounterStateProvider>
    </Page>
  );
}
