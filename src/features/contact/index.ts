/**
 * Contact domain — the public `/contact` page: quick-contact channels,
 * an enquiry form and store info.
 */
export { ContactHero } from './components/contact-hero';
export { ContactChannels } from './components/contact-channels';
export { ContactForm } from './components/contact-form';
export { ContactInfoPanel } from './components/contact-info-panel';
export { ContactFaq } from './components/contact-faq';
export { CONTACT_FAQ } from './data/contact';

export { contactFormSchema, CONTACT_SUBJECTS } from './types';
export type { ContactFormValues, ContactSubject } from './types';
