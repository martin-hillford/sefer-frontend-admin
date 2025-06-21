export const isValidTwoFactorAuthCode = (code : string | undefined | null) =>
  code && code.length === 6 && /^\d+$/.test(code);
