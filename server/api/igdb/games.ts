import type { NewGame, NewGameEngine, NewGameGenre, NewGameKeyword, NewGameModeGame, NewGamePlatform, NewGamePlayerPerspective, NewGameTheme } from '~/server/database/schema'
import type { GameData } from '~/server/utils/igdb'
import { gameService } from '~/server/services/gameService'
import { themesService } from '~/server/services/themesService'
import fs from 'fs/promises'
import path from 'path'

// Used to transform the data from IGDB API to the database schema
type M2MInsertData = {
    game_engines: NewGameEngine[],
    game_modes: NewGameModeGame[],
    genres: NewGameGenre[],
    player_perspectives: NewGamePlayerPerspective[],
    themes: NewGameTheme[],
    platforms: NewGamePlatform[],
    keywords: NewGameKeyword[]
}

export default defineEventHandler(async () => {
    const igbd_client = useIGBD()

    let games = await getCachedGames()
    
    if (Object.keys(games).length <= 0) {
        console.log('No cached games found, fetching from IGDB API...')
        games = await igbd_client.fetchGames()
        await cacheGames(games)
    }
    
    if (!games.length) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No games found'
        })
    }

    const gamesData: NewGame[] = []
    const m2mGameData: M2MInsertData = {
        game_engines: [],
        game_modes: [],
        genres: [],
        player_perspectives: [],
        themes: [],
        platforms: [],
        keywords: []
    }

    for (const game of games as GameData[]) {
        // const transformedDate = game.first_release_date
        //     ? new Date((game.first_release_date as unknown as number) * 1000)
        //     : null

        // gamesData.push({
        //     id: game.id,
        //     slug: game.slug,
        //     name: game.name,
        //     aggregated_rating: game.aggregated_rating,
        //     rating: game.rating,
        //     storyline: game.storyline,
        //     game_type: game.game_type,
        //     first_release_date: transformedDate
        // })

       if(game.themes !== undefined && Array.isArray(game.themes)) {
            game.themes.forEach((theme) => { 
                return m2mGameData.themes.push({
                    game_id: game.id as number,
                    theme_id: theme
                })
            })
        }
    }

    const insertedRecords = await gameService.bulkInsert(gamesData)
    await Promise.all([themesService.insertGameThemes(m2mGameData.themes)])
    
    return {
        message: `Inserted ${insertedRecords} games into the database`
    }
})


async function getCachedGames() {
    const CACHE_FILE = path.resolve('cache/igdb_games.json')

    try {
        const file = await fs.readFile(CACHE_FILE, 'utf-8')
        return JSON.parse(file)
    } catch (err) {
        return console.error('Error reading cache file:', err)
    }
}

async function cacheGames(games: NewGame[]) {
    const CACHE_FILE = path.resolve('cache/igdb_games.json')

    try {
        await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true })
        await fs.writeFile(CACHE_FILE, JSON.stringify(games, null, 2))
        console.log('Games cached successfully')
    } catch (err) {
        console.error('Error writing cache file:', err)
    }
}
