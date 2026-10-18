import { WeightListResponseSchema } from '@elance/contracts'
import * as v from 'valibot'

import type { WeightEntry } from '@elance/contracts'

export function parseWeightListResponse(payload: unknown): WeightEntry[] {
	const parsed = v.safeParse(WeightListResponseSchema, payload)
	if (!parsed.success) return []
	return parsed.output.entries
}
