let x = 0
let rowReservations: boolean[] = []
let nextRowReservations: boolean[] = []
const cache: boolean[] = []

/**
 * memoized func for calculating large image indices
 * @param columns column count
 * @param i index of last image
 * @returns indices; true = large image, false = small image
 */
export const getLargeImageIndices = (columns: number, i: number): boolean[] => {
    // cache hit
    if (cache[i] !== undefined) {
        return cache.slice()
    }
    // preceding i is also missing
    if (i > 0 && cache[i - 1] === undefined) {
        getLargeImageIndices(columns, i - 1) // caches result
    }
    // cycle x to point of next unreserved span
    while (rowReservations[x]) {
        if (x + 1 < columns) {
            x++
        } else {
            rowReservations = nextRowReservations
            nextRowReservations = new Array(columns)
            x = 0
        }
    }
    // determine image size and reserve span
    if (x + 1 < columns && !rowReservations[x + 1] && Math.random() < 0.2) {
        rowReservations[x] = true
        rowReservations[x + 1] = true
        nextRowReservations[x] = true
        nextRowReservations[x + 1] = true
        cache.push(true)
    } else {
        rowReservations[x] = true
        cache.push(false)
    }
    return cache
}
