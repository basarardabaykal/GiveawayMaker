import { parsePhoneNumberFromString } from 'libphonenumber-js'

export function isValidInternationalPhone(input: string): boolean {
  const raw = input?.trim();
  if (!raw) return false;
  const withPlus = raw.startsWith('+') ? raw : `+${raw}`;
  try {
    const pn = parsePhoneNumberFromString(withPlus);
    return !!pn && pn.isValid();
  } catch {
    return false;
  }
}
