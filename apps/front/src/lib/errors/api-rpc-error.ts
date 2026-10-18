import { APP_NAME } from '@elance/contracts'

export class ApiRpcError extends Error {
	constructor(method: string) {
		super(`${APP_NAME} API binding exposes no RPC method named ${method}`)
		this.name = 'ApiRpcError'
	}
}
