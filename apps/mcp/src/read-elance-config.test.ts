import { afterEach, describe, expect, it, vi } from 'vitest'

import { readElanceConfig } from './read-elance-config.ts'

afterEach(() => {
	vi.unstubAllEnvs()
})

describe('readElanceConfig', () => {
	it('fails fast when the API token is missing', () => {
		vi.stubEnv('ELANCE_API_TOKEN', '')

		expect(() => readElanceConfig()).toThrow(
			'ELANCE_API_TOKEN est manquant',
		)
	})

	it('returns the trimmed API token', () => {
		vi.stubEnv('ELANCE_API_TOKEN', ' token ')

		expect(readElanceConfig()).toEqual({
			apiToken: 'token',
			apiFetch: expect.any(Function),
		})
	})
})
