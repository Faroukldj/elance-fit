import type { IngestBody } from '@elance/contracts'
import type { IngestRepository } from '../ports/ingest-repository'

export async function ingestEntries(
	repository: IngestRepository,
	apiToken: string,
	body: IngestBody,
): Promise<number | null> {
	const userId = await repository.findUserIdByApiToken(apiToken)
	if (!userId) return null
	return repository.insertEntries({ ...body, userId })
}
