import { mutate } from 'swr'

export const setCardBlocked = (index, list, updateList) => {
    console.log(list)
    let updatedCards = [...list.cards]
    updatedCards[index] = {
        ...list.cards[index],
        isBlocked: !list.cards[index].isBlocked,
    }
    sendListUpdate({ ...list, cards: updatedCards })
}

export const addCard = (title, cards) => {
    const newCard = {
        id: `${cards.length}`,
        title,
        isBlocked: false,
        position: cards.length,
    }
    const payload = { ...list, cards: [...cards, newCard] }
    sendListUpdate(payload)

    setShowAddCard(false)
}

export const deleteCard = (id, cards) => {
    const payload = {
        ...list,
        cards: cards.filter((card) => card.id != id),
    }
    sendListUpdate(payload)
}

export const sendListUpdate = async (payload) => {
    mutate('/api/lists', (lists) => ({ ...lists, [list_id]: payload }), false)
    mutate('/api/lists', async (lists) => {
        const updatedList = await fetch(`/api/lists/${list_id}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
        })

        lists[list_id] = updatedList
        return lists
    })
}



export const handleEscape = (e) => {
    if (e.key == 'Escape') {
        setShowAddCard(false)
    }
}

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}
