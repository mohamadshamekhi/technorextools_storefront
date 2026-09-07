import Link from 'next/link';

import { Button, Heading, Text } from '@/components/atoms';
import { routes } from '@/config/routes';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-brand-600 text-sm font-semibold">404</p>
      <Heading as="h1">Page not found</Heading>
      <Text>The page you are looking for does not exist or has moved.</Text>
      <Link href={routes.home}>
        <Button>Back to home</Button>
      </Link>
    </main>
  );
}
