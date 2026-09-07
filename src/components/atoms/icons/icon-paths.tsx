import type { ReactNode } from 'react';

import { TOOL_ICONS } from './icon-paths.tools';
import { UI_ICONS } from './icon-paths.ui';

/**
 * The full icon registry — inner SVG geometry rendered as real elements
 * (never `dangerouslySetInnerHTML`), so the set stays XSS-safe. Split into
 * two source files only to respect the per-file line cap.
 */
export const ICON_PATHS = { ...TOOL_ICONS, ...UI_ICONS } satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICON_PATHS;
