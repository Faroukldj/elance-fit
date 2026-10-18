import { INGEST_PATH } from '@elance/contracts'
import { HTTP_UNAUTHORIZED } from '@elance/contracts/http'

import type { IngestBody } from '@elance/contracts'
import type { ApiFetch, ElanceConfig } from './read-elance-config.ts'

export type IngestMealsOutcome =
	| { kind: 'success' }
	| { kind: 'invalid-token' }
	| { kind: 'network'; message: string }
	| { kind: 'elance-error'; status: number; error: string }

export async function ingestMeals(
	config: ElanceConfig,
	body: IngestBody,
	fetchImpl: ApiFetch = config.apiFetch,
): Promise<IngestMealsOutcome> {
	try {
		const response = await fetchImpl(INGEST_PATH, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.apiToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
		return await mapIngestResponse(response)
	} catch (caught: unknown) {
		return { kind: 'network', message: networkErrorMessage(caught) }
	}
}

async function mapIngestResponse(
	response: Response,
): Promise<IngestMealsOutcome> {
	if (response.status === HTTP_UNAUTHORIZED) {
		return { kind: 'invalid-token' }
	}
	if (response.ok) {
		return { kind: 'success' }
	}
	return {
		kind: 'elance-error',
		status: response.status,
		error: await readElanceError(response),
	}
}

async function readElanceError(response: Response): Promise<string> {
	const payload = await readJsonPayload(response)
	if (hasErrorMessage(payload)) return payload.error
	if (response.statusText) return response.statusText
	return 'réponse invalide'
}

async function readJsonPayload(response: Response): Promise<unknown> {
	try {
		return await response.json()
	} catch {
		return null
	}
}

function hasErrorMessage(payload: unknown): payload is { error: string } {
	if (typeof payload !== 'object' || payload === null) return false
	if (!('error' in payload)) return false
	return typeof payload.error === 'string'
}

function networkErrorMessage(caught: unknown): string {
	if (caught instanceof Error) return caught.message
	return 'erreur inconnue'
}
