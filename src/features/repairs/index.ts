/** Repairs domain — client-safe surface. The BFF route lives at `src/app/api/repairs`. */
export { RepairForm } from './components/repair-form';
export { RepairLoginNotice } from './components/repair-login-notice';
export { RepairSent } from './components/repair-sent';
export {
  repairFormSchema,
  repairRequestSchema,
  repairDecisionSchema,
  REPAIR_STATUSES,
  MAX_REPAIR_ATTACHMENTS,
} from './types';
export type { RepairFormValues, RepairRequest, RepairStatus } from './types';
export type { RepairDecisionValues } from './types';
export type { RepairAttachment, RepairStatusEntry } from './types';
