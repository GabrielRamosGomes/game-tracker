import { BaseService } from './baseService'
import { themes } from '../database/schema'

class ThemesService extends BaseService<typeof themes> {}

export const themesService = new ThemesService(themes, themes.id)
