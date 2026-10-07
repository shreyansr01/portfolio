/**
 * Calculates Shreyan's local time in Kolkata (IST)
 * and the relative difference between Kolkata and the visitor's local timezone.
 */

export function getKolkataTime(): string {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Returns a human-friendly relative offset string comparing Kolkata time (UTC+5:30)
 * to the visitor's local browser timezone.
 *
 * Examples:
 * - Visitor in India (UTC+5:30)  -> "same time"
 * - Visitor in NYC EDT (UTC-4)    -> "9.5h ahead"
 * - Visitor in SF PDT (UTC-7)     -> "12.5h ahead"
 * - Visitor in London BST (UTC+1) -> "4.5h ahead"
 * - Visitor in London GMT (UTC+0) -> "5.5h ahead"
 * - Visitor in Dubai (UTC+4)      -> "1.5h ahead"
 * - Visitor in Tokyo (UTC+9)      -> "3.5h behind"
 * - Visitor in Nepal (UTC+5:45)   -> "15m behind"
 */
export function getRelativeTimeOffset(): string {
  try {
    // Visitor's offset from UTC in minutes
    // Note: getTimezoneOffset() returns positive for west of UTC, negative for east of UTC.
    const visitorOffsetMinutes = -new Date().getTimezoneOffset();

    // Kolkata is strictly UTC+5:30 (330 minutes) all year round without DST
    const kolkataOffsetMinutes = 330;

    const diffMinutes = kolkataOffsetMinutes - visitorOffsetMinutes;

    if (diffMinutes === 0) {
      return "same time";
    }

    const direction = diffMinutes > 0 ? "ahead" : "behind";
    const absMinutes = Math.abs(diffMinutes);
    const hours = Math.floor(absMinutes / 60);
    const mins = absMinutes % 60;

    if (mins === 0) {
      return `${hours}h ${direction}`;
    } else if (mins === 30 && hours > 0) {
      return `${hours}.5h ${direction}`;
    } else if (hours === 0) {
      return `${mins}m ${direction}`;
    } else {
      return `${hours}h ${mins}m ${direction}`;
    }
  } catch {
    return "same time";
  }
}
