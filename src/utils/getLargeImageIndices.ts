// values to track when calculating indices
interface cache {
    calculatedIndices: boolean[]
    x: number
    rowReservations: boolean[]
    nextRowReservations: boolean[]
    smallImagesInSequence: number
}

// caches for each column count. cache[n] is cache for column count n
const caches: cache[] = []

/**
 * memoized func for calculating large image indices
 * @param columns column count
 * @param i last index to calculate
 * @returns indices. true: large image, false: small image
 */
export const getLargeImageIndices = (columns: number, i: number): boolean[] => {
    // create cache for column count, if it doesn't yet exist
    const cache = (caches[columns] ??= {
        calculatedIndices: [],
        x: 0,
        rowReservations: [],
        nextRowReservations: [],
        smallImagesInSequence: 0,
    })
    // cache hit
    if (cache.calculatedIndices[i] !== undefined) {
        return cache.calculatedIndices
    }
    // first index
    if (i < 1) {
        return calculateCurrentIndex(columns, cache)
    }
    // calculate previous index: causes recursion and caching
    getLargeImageIndices(columns, i - 1)

    return calculateCurrentIndex(columns, cache)
}

/**
 * @returns indices after calculating current index
 */
const calculateCurrentIndex = (columns: number, cache: cache): boolean[] => {
    cycleToNextUnreservedSpan(columns, cache)
    if (shouldIndexBeLarge(columns, cache)) {
        reserveLargeIndex(cache)
    } else {
        reserveSmallIndex(cache)
    }
    return cache.calculatedIndices
}

const cycleToNextUnreservedSpan = (columns: number, cache: cache): void => {
    while (cache.rowReservations[cache.x]) {
        if (cache.x + 1 < columns) {
            cache.x++
        } else {
            cache.rowReservations = cache.nextRowReservations
            cache.nextRowReservations = new Array(columns)
            cache.x = 0
        }
    }
}

const shouldIndexBeLarge = (columns: number, cache: cache): boolean =>
    cache.x + 1 < columns && // check if last span of row
    !cache.rowReservations[cache.x + 1] && // check if next span is reserved
    (cache.smallImagesInSequence > 3 || Math.random() < 0.2) // chance of about 20% after all other checks

const reserveLargeIndex = (cache: cache): void => {
    cache.rowReservations[cache.x] = true
    cache.rowReservations[cache.x + 1] = true
    cache.nextRowReservations[cache.x] = true
    cache.nextRowReservations[cache.x + 1] = true
    cache.smallImagesInSequence = 0
    cache.calculatedIndices.push(true)
}

const reserveSmallIndex = (cache: cache): void => {
    cache.rowReservations[cache.x] = true
    cache.smallImagesInSequence++
    cache.calculatedIndices.push(false)
}
