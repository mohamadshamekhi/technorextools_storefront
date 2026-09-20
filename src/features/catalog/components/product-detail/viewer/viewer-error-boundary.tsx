'use client';

import { Component, type ReactNode } from 'react';

type Props = { onError: () => void; children: ReactNode };
type State = { failed: boolean };

/** Catches GLB load/parse failures (R3F rethrows them into React). */
export class ViewerErrorBoundary extends Component<Props, State> {
  override state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  override componentDidCatch(): void {
    this.props.onError();
  }

  override render() {
    return this.state.failed ? null : this.props.children;
  }
}
