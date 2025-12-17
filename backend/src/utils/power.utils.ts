interface generation {
    from: string,
    to: string,
    generationmix: {fuel: string, perc: number}[]
}

export const calcDaily = (data: generation[]) => {
    const clean = ['biomass', 'nuclear', 'hydro', 'wind', 'solar']

    const result: Record<string, any> = {}

    data.forEach(timeInterval => {
        const day = timeInterval.from.split('T')[0]
        if (!result[day]) result[day] = {count: 0, sum: {}}

        clean.forEach( fuel => {
            result[day].sum[fuel] = (result[day].sum[fuel] || 0) + (timeInterval.generationmix.find(g => g.fuel.toLowerCase() === fuel)?.perc || 0)
        })

        result[day].count += 1
    })

    const output = Object.keys(result).map(day => {
        const average: Record<string, number> = {}
        let cleanSum = 0

        clean.forEach(fuel => {
            average[fuel] = result[day].sum[fuel] / result[day].count
            cleanSum += average[fuel]
        })

        return {
            data: day,
            average,
            cleanPerc: parseFloat(cleanSum.toFixed(2))
        }
    })

    return output
}