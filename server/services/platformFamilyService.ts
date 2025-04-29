import { BaseService } from './baseService'
import type { NewPlatformFamily } from '../database/schema'
import { platform_families } from '../database/schema'

class PlatformFamilyService extends BaseService<typeof platform_families> {
    public async insertMany(types: NewPlatformFamily[]) {
        return await this.insert(types, platform_families.id)
    }
}

export const platformFamilyService = new PlatformFamilyService(platform_families)
