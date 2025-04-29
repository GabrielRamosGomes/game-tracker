import { BaseService } from './baseService'
import type { NewPlatformFamily } from '../database/schema'
import { platform_families } from '../database/schema'

class PlatformFamilyService extends BaseService {
    public async insertMany(types: NewPlatformFamily[]) {
        return await this.insert(types, platform_families.id)
    }
}

const platformFamilyService = new PlatformFamilyService(platform_families)

export function usePlatformFamilyService() {
    return platformFamilyService
}
