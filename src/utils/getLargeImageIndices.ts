// caches for each column count
const caches: {
    indices: boolean[]
    x: number
    rowReservations: boolean[]
    nextRowReservations: boolean[]
    smallImagesInSequence: number
}[] = []

/**
 * memoized func for calculating large image indices
 * @param columns column count
 * @param i last index to calculate
 * @returns indices; true: large image, false: small image
 */
export const getLargeImageIndices = (columns: number, i: number): boolean[] => {
    const cache = (caches[columns] ??= {
        indices: [],
        x: 0,
        rowReservations: [],
        nextRowReservations: [],
        smallImagesInSequence: 0,
    })
    // cache hit
    if (cache.indices[i] !== undefined) {
        return cache.indices
    }
    // preceding i is also missing
    if (i > 0 && cache.indices[i - 1] === undefined) {
        getLargeImageIndices(columns, i - 1) // caches result
    }
    // cycle x to point of next unreserved span
    while (cache.rowReservations[cache.x]) {
        if (cache.x + 1 < columns) {
            cache.x++
        } else {
            cache.rowReservations = cache.nextRowReservations
            cache.nextRowReservations = new Array(columns)
            cache.x = 0
        }
    }
    // determine image size and reserve span
    if (
        cache.x + 1 < columns &&
        !cache.rowReservations[cache.x + 1] &&
        (cache.smallImagesInSequence > 3 || Math.random() < 0.2)
    ) {
        cache.rowReservations[cache.x] = true
        cache.rowReservations[cache.x + 1] = true
        cache.nextRowReservations[cache.x] = true
        cache.nextRowReservations[cache.x + 1] = true
        cache.smallImagesInSequence = 0
        cache.indices.push(true)
    } else {
        cache.rowReservations[cache.x] = true
        cache.smallImagesInSequence++
        cache.indices.push(false)
    }
    return cache.indices
}
