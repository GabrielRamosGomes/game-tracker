import { BaseService } from './baseService'
import { games } from '../database/schema'

class GameService extends BaseService<typeof games> {
    async bullkInsert(data: (typeof games)['$inferInsert'][]) {
        console.log('Mapping data...')
        const transformedData = data.map((game) => {
            const transformedDate = game.first_release_date
                ? new Date((game.first_release_date as unknown as number) * 1000)
                : null

            return {
                ...game,
                first_release_date: transformedDate,
            }
        })
        console.log('Inserting data...')

        return super.bulkInsert(transformedData, 500)
    }
}

export const gameService = new GameService(games, games.id)
