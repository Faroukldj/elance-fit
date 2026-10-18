import { weightToDisplayUnit } from '@elance/contracts'

import type { Units, WeightEntry } from '@elance/contracts'
import type { DisplayWeightEntry } from './display-weight-entry'

export function toDisplayWeightEntries(
	entries: readonly WeightEntry[],
	units: Units,
): DisplayWeightEntry[] {
	return entries.map(entry => ({
		entryDate: entry.entryDate,
		weight: weightToDisplayUnit(entry.weightKg, units),
	}))
}
