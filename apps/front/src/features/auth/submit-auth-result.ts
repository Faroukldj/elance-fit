import type { AppError } from '@elance/contracts'

export type SubmitAuthResult = { ok: true } | { ok: false; error: AppError }
