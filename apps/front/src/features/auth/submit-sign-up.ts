import {
	AUTH_SIGN_UP_PATH,
	AuthSuccessResponseSchema,
	ConnectionError,
	InvalidServerResponseError,
	readAuthError,
} from '@elance/contracts'
import * as v from 'valibot'

import type { SignUpFormValues } from '@elance/contracts'
import type { SubmitAuthResult } from './submit-auth-result'

export async function submitSignUp(
	values: SignUpFormValues,
): Promise<SubmitAuthResult> {
	try {
		const response = await fetch(AUTH_SIGN_UP_PATH, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: values.email,
				email: values.email,
				password: values.password,
			}),
		})
		const payload: unknown = await response.json()
		if (!response.ok) return { ok: false, error: readAuthError(payload) }
		const created = v.safeParse(AuthSuccessResponseSchema, payload)
		if (!created.success) {
			return { ok: false, error: new InvalidServerResponseError() }
		}
		return { ok: true }
	} catch {
		return { ok: false, error: new ConnectionError() }
	}
}
