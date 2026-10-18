import { APP_NAME } from '@elance/contracts'

export class ApiError extends Error {
	readonly status: number

	constructor(path: string, status: number) {
		super(`${APP_NAME} API request to ${path} failed with status ${status}`)
		this.name = 'ApiError'
		this.status = status
	}
}
