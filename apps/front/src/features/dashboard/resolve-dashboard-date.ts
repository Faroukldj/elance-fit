import { isIsoDate } from '@elance/contracts'

// The dashboard never shows the future: an invalid or future date falls back to today.
export function resolveDashboardDate(
	requested: string | null,
	today: string,
): string {
	if (!isIsoDate(requested) || requested > today) return today
	return requested
}
