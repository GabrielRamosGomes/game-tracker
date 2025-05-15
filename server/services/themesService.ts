import { BaseService } from './baseService'
import { themes, game_themes } from '../database/schema'
import type { NewGameTheme } from '../database/schema'

class GameThemeService extends BaseService<typeof game_themes> {}
const gameThemeService = new GameThemeService(game_themes, game_themes.id)

class ThemesService extends BaseService<typeof themes> {
    public async insertGameThemes(data: NewGameTheme[]) {
        const records = await gameThemeService.bulkInsert(data)
        console.log(`Inserted ${records} game themes into the database`)
    }
}

export const themesService = new ThemesService(themes, themes.id)
