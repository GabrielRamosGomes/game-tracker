import { BaseService } from './baseService'
import { time_to_beat } from '../database/schema'

class TimeToBeatService extends BaseService<typeof time_to_beat> {}
export const timeToBeatService = new TimeToBeatService(time_to_beat, time_to_beat.id)
