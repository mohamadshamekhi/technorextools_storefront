import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional class names and de-dupe conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Type-safe `Object.keys`. */
export function keysOf<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

/** Absolute URL builder for canonical / OG tags. */
export function absoluteUrl(path: string, base: string): string {
  return new URL(path, base).toString();
}
