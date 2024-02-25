export const envOrDefault = (key: string, defaultValue: string) => {
  return process.env[key] || defaultValue;
}