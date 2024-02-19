// get domain from url
export function getDomain(url?: string) {
  if (!url) return

  try {
    return new URL(url).hostname
  } catch (error) {
    return
  }
}
