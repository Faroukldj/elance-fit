import type { SettingsProfile } from '@elance/contracts'
import type { SettingsProfileRepository } from '../ports/settings-profile-repository'

export function getSettingsProfile(
	repository: SettingsProfileRepository,
	userId: string,
): Promise<SettingsProfile | null> {
	return repository.findByUserId(userId)
}
