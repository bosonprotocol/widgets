export function extractBooleanParam(
  paramStr: string | null,
  defaultValue: boolean
): boolean {
  return paramStr ? /^true$/i.test(paramStr) : defaultValue;
}
