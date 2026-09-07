export function isSeoCrawler() {
  if (typeof navigator === 'undefined') return false;
  return /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|embedly|whatsapp|telegrambot|applebot|crawler|spider|bot\b/i.test(
    navigator.userAgent,
  );
}
