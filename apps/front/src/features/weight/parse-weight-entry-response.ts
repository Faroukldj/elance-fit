import { WeightEntryResponseSchema } from '@elance/contracts'
import * as v from 'valibot'

import type { WeightEntry } from '@elance/contracts'

export function parseWeightEntryResponse(payload: unknown): WeightEntry | null {
	const parsed = v.safeParse(WeightEntryResponseSchema, payload)
	if (!parsed.success) return null
	return parsed.output.entry
}
