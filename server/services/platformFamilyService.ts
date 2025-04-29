import { BaseService } from './baseService'
import { platform_families } from '../database/schema'

class PlatformFamilyService extends BaseService<typeof platform_families> {}

export const platformFamilyService = new PlatformFamilyService(
    platform_families,
    platform_families.id
)
