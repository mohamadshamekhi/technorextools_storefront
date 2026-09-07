'use client';

import { Component, type ReactNode } from 'react';

import { Icon } from '@/components/atoms';

type Props = { children: ReactNode };
type State = { failed: boolean };

/** Falls back gracefully when WebGL is unavailable or the scene throws. */
export class StageBoundary extends Component<Props, State> {
  override state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  override render() {
    if (this.state.failed) {
      return (
        <div className="text-foreground-muted grid h-full place-items-center gap-2 p-6 text-center text-xs">
          <Icon name="cube" className="size-6" />
          نمای سه‌بعدی در این مرورگر پشتیبانی نمی‌شود.
        </div>
      );
    }
    return this.props.children;
  }
}
