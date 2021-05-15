// Reorder a list's cards
export const reorder = (list, startIndex, targetIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(targetIndex, 0, removed)

    return result
}
