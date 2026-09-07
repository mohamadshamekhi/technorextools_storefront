'use client';

import { useEffect } from 'react';

import { Button, Heading, Text } from '@/components/atoms';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
      <Heading as="h1">Something went wrong</Heading>
      <Text>An unexpected error occurred. Our team has been notified.</Text>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
