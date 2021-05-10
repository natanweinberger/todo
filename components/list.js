import { useState, useEffect } from 'react'
import { mutate } from 'swr'
import Card from './Card'

const Title = ({ title, updateTitle }) => {
    const [isInEditMode, setIsInEditMode] = useState(false)
    if (isInEditMode) {
        return (
            <span className="font-bold py-1 self-center">
                <input
                    className='pl-1'
                    autoFocus
                    type="text"
                    placeholder={title}
                    onKeyPress={(e) => {
                        if (e.key == 'Enter') {
                            updateTitle(e.target.value)
                            setIsInEditMode(false)
                        }
                    }}
                    onBlur={() => setIsInEditMode(false)}
                />
            </span>
        )
    }
    return (
        <span
            className="font-bold py-1 self-center"
            onClick={() => setIsInEditMode(true)}
        >
            {title}
        </span>
    )
}

const List = ({ list, list_id, updateList }) => {
    const { title, cards } = list
    const [showAddCard, setShowAddCard] = useState(false)

    const setCardBlocked = (index) => {
        let updatedCards = [...cards]
        updatedCards[index] = {
            ...cards[index],
            isBlocked: !cards[index].isBlocked,
        }
        updateList({ ...list, cards: updatedCards })
    }

    const sendListUpdate = (payload) => {
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
    useEffect(() => window.addEventListener('keydown', handleEscape))

    return (
        <div className="flex flex-col w-72 rounded-md p-1 mr-2 bg-gray-200 overflow-x-auto flex-shrink-0 transition-all">
            <Title
                title={title}
                updateTitle={(title) => sendListUpdate({ ...list, title })}
            />
            <div className="flex-grow overflow-y-auto p-1">
                {cards.map((card, index) => {
                    return (
                        <Card
                            key={card.id}
                            updateList={() => setCardBlocked(index)}
                            deleteCard={() => deleteCard(card.id)}
                            {...card}
                        />
                    )
                })}
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
