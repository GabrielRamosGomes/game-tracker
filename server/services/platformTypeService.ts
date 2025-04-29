import { BaseService } from './baseService'
import type { NewPlatformType } from '../database/schema'
import { platform_types } from '../database/schema'

class PlatformTypeService extends BaseService<typeof platform_types> {
    public async insertMany(types: NewPlatformType[]) {
        return await this.insert(types, platform_types.id)
    }
}

export const platformTypeService = new PlatformTypeService(platform_types, platform_types.id)
