import { MealListResponseSchema } from '@elance/contracts'
import * as v from 'valibot'

import type { MealEntry } from '@elance/contracts'

export function parseMealListResponse(payload: unknown): MealEntry[] {
	const parsed = v.safeParse(MealListResponseSchema, payload)
	if (!parsed.success) return []
	return parsed.output.entries
}
