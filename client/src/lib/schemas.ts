import * as zod from 'zod'

export const URL = zod.string().url({ message: 'Invalid URL.' })
