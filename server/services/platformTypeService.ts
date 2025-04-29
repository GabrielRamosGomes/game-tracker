import { BaseService } from './baseService'
import type { NewPlatformType } from '../database/schema'
import { platform_types } from '../database/schema'

class PlatformTypeService extends BaseService {
    public async insertMany(types: NewPlatformType[]) {
        return await this.insert(types, platform_types.id)
    }
}

const platformTypeService = new PlatformTypeService(platform_types)

export function usePlatformTypeService() {
    return platformTypeService
}
