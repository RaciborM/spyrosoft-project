import {Request, Response} from 'express'
import {fetchDataGener} from '../services/coal.service'
import {calcDaily} from '../utils/power.utils'

type GenerationMixItem = {
  fuel: string
  perc: number
}

type GenerationInterval = {
  from: string
  to: string
  generationmix: GenerationMixItem[]
}

const CLEAN_SOURCES = ['biomass', 'nuclear', 'hydro', 'wind', 'solar']

export const getPowerMix = async (_req: Request, res: Response) => {
    try {
        const data = await fetchDataGener()

        const result = calcDaily(data)

        res.json(result)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({message: 'server error'})
    }
}

export const getBestWindow = async (req: Request, res: Response) => {
  const hours = parseInt(req.query.hours as string)

  if (!hours || hours < 1 || hours > 6) {
    return res.status(400).json({ message: 'Hours must be 1-6' })
  }

  try {
    const intervals: GenerationInterval[] = await fetchDataGener()
    const windowSize = hours * 2

    let bestAverage = -1
    let bestStart = ''
    let bestEnd = ''

    for (let i = 0; i <= intervals.length - windowSize; i++) {
      const slice = intervals.slice(i, i + windowSize)

      const avgClean =
        slice.reduce((sum: number, interval: GenerationInterval) => {
          const cleanPerc = interval.generationmix.reduce(
            (acc: number, g: GenerationMixItem) =>
              CLEAN_SOURCES.includes(g.fuel) ? acc + g.perc : acc,
            0
          )

          return sum + cleanPerc
        }, 0) / windowSize

      if (avgClean > bestAverage) {
        bestAverage = avgClean
        bestStart = slice[0].from
        bestEnd = slice[slice.length - 1].to
      }
    }

    res.json({
      start: bestStart,
      end: bestEnd,
      averageCleanPerc: +bestAverage.toFixed(2),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'server error' })
  }
}