import { pdpIconSchema, type PdpIcon } from '../services/pdp.schemas';

/** Aliases for the free-form `highlight.icon` keys `abzar/api` sends. */
const ALIASES: Record<string, PdpIcon> = {
  power: 'bolt',
  torque: 'gauge',
  speed: 'gauge',
  rpm: 'gauge',
  weight: 'weight',
  warranty: 'shield',
  guarantee: 'shield',
  drill: 'drill',
  motor: 'gear',
  tool: 'wrench',
};

/** Maps an API icon key to a PDP `Icon` name; unknown keys fall back to `gear`. */
export function toPdpIcon(key: string): PdpIcon {
  const normalized = key.trim().toLowerCase();
  const parsed = pdpIconSchema.safeParse(normalized);
  if (parsed.success) return parsed.data;
  return ALIASES[normalized] ?? 'gear';
}
