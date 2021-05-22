import { mutate } from 'swr'

// Reorder a list's cards
export const reorder = (list, startIndex, targetIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(targetIndex, 0, removed)

    return result
}

export const sendReorder = (list_id, list, result) => {
    patchList(list_id, {
        ...list,
        cards: reorder(
            list.cards,
            result.source.index,
            result.destination.index
        ),
    })
}

export const toggleCardBlocked = (list_id, list, index) => {
    const { cards } = list
    let updatedCards = [...cards]
    updatedCards[index] = {
        ...cards[index],
        isBlocked: !cards[index].isBlocked,
    }
    patchList(list_id, { ...list, cards: updatedCards })
}

export const addCard = (list_id, list, title) => {
    const { cards } = list
    const newCard = {
        id: `${cards.length}`,
        title,
        isBlocked: false,
        position: cards.length,
    }
    const payload = { ...list, cards: [...cards, newCard] }
    patchList(list_id, payload)
}

export const patchList = async (list_id, payload) => {
    // First, execute the state change locally
    mutate('/api/lists', (lists) => ({ ...lists, [list_id]: payload }), false)
    // Next, send the PATCH and revalidate local state
    mutate('/api/lists', async (lists) => {
        const updatedList = await fetch(`/api/lists/${list_id}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
        })

        lists[list_id] = updatedList
        return lists
    })
}
