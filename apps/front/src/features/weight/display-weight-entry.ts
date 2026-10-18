import type { WeightEntry } from '@elance/contracts'

/** A weigh-in already converted to the user's display unit. */
export type DisplayWeightEntry = Pick<WeightEntry, 'entryDate'> & {
	weight: number
}
