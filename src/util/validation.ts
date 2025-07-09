export const isEmpty = (value : string | undefined | null) => !(value && value !== '');

export const isDefined = (value : unknown) => value !== undefined && value !== null;
