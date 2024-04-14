import { CounterStateProvider } from '~/hooks/useCounterState';
import { ControlPanel } from './_components/ControlPanel';
import { BlockRenderer } from './_components/BlockRenderer';
import { NumberView } from './_components/NumberView';
import { Page } from '~/components/ui/Page';

export default function HomePage() {
  return (
    <Page className="max-w-screen relative flex min-h-screen items-center justify-center overflow-y-scroll bg-white dark:bg-black">
      <CounterStateProvider>
        <ControlPanel />
        <BlockRenderer />
        <NumberView />
      </CounterStateProvider>
    </Page>
  );
}
