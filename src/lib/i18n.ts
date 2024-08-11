import { createI18n } from "vue-i18n";
import messages from '@/locales/locales.js';

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages
});