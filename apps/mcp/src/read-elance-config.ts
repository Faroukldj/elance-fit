import { APP_NAME } from '@elance/contracts'

// Adapter signature for reaching the Elance API: stdio uses global fetch
// against the production origin, the remote worker uses the API service
// binding (which ignores the URL host).
export type ApiFetch = (path: string, init?: RequestInit) => Promise<Response>

export type ElanceConfig = {
	apiToken: string
	apiFetch: ApiFetch
}

// Stdio runs outside the Workers runtime: no service binding exists, so the
// production origin is the default target. Override ELANCE_API_ORIGIN to talk
// to another environment (e.g. a local wrangler dev).
const DEFAULT_ELANCE_API_ORIGIN = 'https://api.elance.fit'

export function readElanceConfig(): ElanceConfig {
	const apiToken = process.env.ELANCE_API_TOKEN?.trim()
	if (!apiToken) {
		throw new Error(
			`ELANCE_API_TOKEN est manquant. Définis ELANCE_API_TOKEN avec ton jeton API ${APP_NAME}.`,
		)
	}
	const origin =
		process.env.ELANCE_API_ORIGIN?.trim() || DEFAULT_ELANCE_API_ORIGIN
	return { apiFetch: globalFetchTo(origin), apiToken }
}

function globalFetchTo(origin: string): ApiFetch {
	return (path, init) => fetch(new URL(path, origin), init)
}
