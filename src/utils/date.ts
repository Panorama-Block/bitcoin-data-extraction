export const getDayTimestamp = (day: number) => {
  const timestamp = Math.floor((Date.now() - day * 24 * 60 * 60 * 1000) / 1000)
  return timestamp
}