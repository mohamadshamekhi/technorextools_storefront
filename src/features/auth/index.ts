/**
 * Public surface of the auth feature.
 *
 * NOTE: server-only modules (`services/auth.api`, `services/auth.actions`) are
 * intentionally NOT re-exported here — import them directly from their path in
 * Server Components / route handlers to keep them out of client bundles.
 */
export { AuthSplit } from './components/auth-split';
export { PhoneAuthFlow } from './components/phone-auth/phone-auth-flow';
export { LogoutButton } from './components/logout-button';
export { useCurrentUser } from './hooks/use-current-user';
export { formatRole } from './utils/format-role';
export * from './types';
