'use client';

import { Button } from '@/components/atoms';
import { useUiStore } from '@/store/ui-store';

export function SidebarToggle() {
  const toggle = useUiStore((s) => s.toggleSidebar);

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Toggle sidebar"
      className="hidden md:inline-flex"
      onClick={toggle}
    >
      ☰
    </Button>
  );
}
