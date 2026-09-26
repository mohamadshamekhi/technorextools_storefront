/** Media domain — client-safe surface. The BFF route lives at `src/app/api/media/upload`. */
export { AttachmentPicker } from './components/attachment-picker';
export { useAttachments, type AttachmentsController } from './hooks/use-attachments';
export {
  mediaViewSchema,
  ACCEPTED_UPLOAD_TYPES,
  UPLOAD_ACCEPT_ATTR,
  MAX_UPLOAD_BYTES,
} from './types';
export type { Attachment, AttachmentStatus, MediaView } from './types';
