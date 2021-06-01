import { mutate } from 'swr'
import { v4 as uuid } from 'uuid'

// Reorder a list's cards
export const reorder = (list, startIndex, targetIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(targetIndex, 0, removed)

    return result
}

export const sendReorder = (list_id, list, result) => {
    if (!result.destination) {
        return
    }
    if (result.source.index == result.destination.index) {
        return
    }
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

// export const addCard = (list_id, list, title) => {
//     const { cards } = list
//     const newCard = {
//         id: uuid(),
//         title,
//         isBlocked: false,
//         position: cards.length,
//     }
//     const payload = { ...list, cards: [...cards, newCard] }
//     patchList(list_id, payload)
// }

export const addCard = async (list_id, title) => {
    mutate('/api/lists', async (data) => {
        const payload = { title }
        const response = await fetch(`/api/lists/${list_id}/cards`, {
            method: 'POST',
            body: JSON.stringify(payload),
        })
        data.lists[list_id].cards = response
        return data
    })
}

export const patchList = async (list_id, payload) => {
    // First, execute the state change locally
    mutate(
        '/api/lists',
        (data) => {
            const { order, lists } = data
            return { order, lists: { ...lists, [list_id]: payload } }
        },
        false
    )
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
