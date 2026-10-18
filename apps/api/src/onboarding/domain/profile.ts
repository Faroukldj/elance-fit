import type { OnboardingBody } from '@elance/contracts'

export type Profile = OnboardingBody & {
	sessionId: string
}

export type OwnedProfile = Profile & {
	userId: string
	apiToken: string
}
