import { useState, useEffect } from 'react'
import { mutate } from 'swr'
import Card from '@/components/Card'
import Title from '@/components/list/title'
import DraggableList from '@/components/list/draggableList'

const List = ({ list, list_id, updateList }) => {
    const { title, cards } = list
    const [showAddCard, setShowAddCard] = useState(false)

    const setCardBlocked = (index) => {
        console.log(index)
        let updatedCards = [...cards]
        updatedCards[index] = {
            ...cards[index],
            isBlocked: !cards[index].isBlocked,
        }
        sendListUpdate({ ...list, cards: updatedCards })
    }

    const sendListUpdate = async (payload) => {
        mutate(
            '/api/lists',
            (lists) => ({ ...lists, [list_id]: payload }),
            false
        )
        mutate('/api/lists', async (lists) => {
            const updatedList = await fetch(`/api/lists/${list_id}`, {
                method: 'PATCH',
                body: JSON.stringify(payload),
            })

            lists[list_id] = updatedList
            return lists
        })
    }

    const addCard = (title) => {
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

    const deleteCard = (id) => {
        const payload = {
            ...list,
            cards: cards.filter((card) => card.id != id),
        }
        sendListUpdate(payload)
    }

    const handleEscape = (e) => {
        if (e.key == 'Escape') {
            setShowAddCard(false)
        }
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    useEffect(() => window.addEventListener('keydown', handleEscape))

    const sendReorder = (cards, result) => {
        sendListUpdate({
            ...list,
            cards: reorder(
                cards,
                result.source.index,
                result.destination.index
            ),
        })
    }

    return (
        <div className="flex flex-col w-72 rounded-md p-1 mr-2 bg-gray-200 overflow-x-auto flex-shrink-0 transition-all">
            <Title
                title={title}
                updateTitle={(title) => sendListUpdate({ ...list, title })}
            />
            <div className="flex-grow p-1">
                <DraggableList
                    onDragEnd={(result) => sendReorder(cards, result)}
                    items={cards}
                    component={(card, index) => (
                        <Card
                            title={card.title}
                            key={card.id}
                            isBlocked={card.isBlocked}
                            deleteCard={() => deleteCard(card.id)}
                            setBlocked={() => setCardBlocked(index)}
                        />
                    )}
                />
                {showAddCard && (
                    <Card
                        key="addCard"
                        isEditable={true}
                        addCard={addCard}
                        hideAddCard={() => setShowAddCard(false)}
                    />
                )}
            </div>
            <div
                className="rounded-md p-2 text-sm text-gray-600 hover:bg-gray-300 hover:text-gray-800"
                onClick={() => setShowAddCard(true)}
            >
                + &nbsp; Add a card
            </div>
        </div>
    )
}

export default List
