/**
 * On-screen text in each language, and the locale each language uses.
 *
 * Only what the viewer sees lives here. Internal names stay as they are: the
 * full-choir part is still stored as "Kaikki" and only *shown* as t('all').
 *
 * To add a language: add its code to LANGS, a locale to LOCALES, and a full
 * entry to `messages` (the type check refuses a language with a phrase missing).
 *
 * How App.vue picks the language: `?lang=` in the address, else the choice
 * made with the switch on this device, else the first of the browser's
 * preferred languages that the page has, else the choir's own `lang` in its
 * entry file, else Finnish.
 */
export const LANGS = ['en', 'fi'] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(v: unknown): v is Lang {
  return typeof v === 'string' && (LANGS as readonly string[]).includes(v);
}

/**
 * The first of the browser's preferred languages that the page has, by its
 * main part: 'fi-FI' counts as 'fi', 'en-GB' as 'en' (shown with en-US
 * conventions). Null if the browser lists none of them.
 */
export function browserLang(prefs: readonly string[]): Lang | null {
  for (const p of prefs) {
    const base = p.toLowerCase().split('-')[0];
    if (isLang(base)) return base;
  }
  return null;
}

/** Locale for dates and alphabetical order. Finnish keeps the 'fi' it always used. */
const LOCALES: Record<Lang, string> = { en: 'en-US', fi: 'fi' };
export const localeOf = (l: Lang): string => LOCALES[l];

/** Finnish: the page's original text, word for word. */
const fi = {
  pageTitle: 'Stemmanauhat',
  noData: 'No decrypted data available. Please provide a valid passphrase in the URL.',
  back10: 'Taakse 10 s',
  forward10: 'Eteen 10 s',
  crop: 'Rajaa / zoomaa',
  seek: 'Kelaa',
  zoom: 'Zoom',
  reset: 'Nollaa',
  saveForSong: 'Tallenna laululle',
  saved: 'Tallennettu ✓ (commitoi muutos)',
  saveFailed: 'Tallennus epäonnistui',
  searchPlaceholder: 'Hae lauluja...',
  search: 'Hae lauluja',
  sort: 'Järjestä',
  sortName: 'Nimi',
  sortAdded: 'Lisätty',
  language: 'Kieli',
  songs: 'laulua',
  continue: 'Jatka siitä mihin jäit',
  new: 'Uusi',
  close: 'Sulje',
  all: 'Kaikki',
  noResults: 'Ei löydetty lauluja hakusanalla',
};

export type MessageKey = keyof typeof fi;

/** English, for US use. */
const en: Record<MessageKey, string> = {
  pageTitle: 'Practice Videos',
  noData: 'No decrypted data available. Please provide a valid passphrase in the URL.',
  back10: 'Back 10 seconds',
  forward10: 'Forward 10 seconds',
  crop: 'Crop / zoom',
  seek: 'Seek',
  zoom: 'Zoom',
  reset: 'Reset',
  saveForSong: 'Save for this song',
  saved: 'Saved ✓ (commit the change)',
  saveFailed: 'Save failed',
  searchPlaceholder: 'Search songs...',
  search: 'Search songs',
  sort: 'Sort',
  sortName: 'Name',
  sortAdded: 'Added',
  language: 'Language',
  songs: 'songs',
  continue: 'Continue where you left off',
  new: 'New',
  close: 'Close',
  all: 'All',
  noResults: 'No songs found for',
};

export const messages: Record<Lang, Record<MessageKey, string>> = { fi, en };
