import { BaseService } from './baseService'
import { platforms } from '../database/schema'

class PlatformService extends BaseService<typeof platforms> {}

export const platformService = new PlatformService(platforms, platforms.id)
