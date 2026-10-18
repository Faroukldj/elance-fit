import type { IngestBody } from '@elance/contracts'

export type AuthenticatedIngest = IngestBody & {
	userId: string
}
