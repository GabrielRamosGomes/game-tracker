import { BaseService } from './baseService'
import { platform_types } from '../database/schema'

class PlatformTypeService extends BaseService<typeof platform_types> {}

export const platformTypeService = new PlatformTypeService(platform_types, platform_types.id)
