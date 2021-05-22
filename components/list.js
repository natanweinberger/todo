import { useState, useEffect } from 'react'
import { mutate } from 'swr'
import Card from '@/components/Card'
import Title from '@/components/list/title'
import DraggableList from '@/components/list/draggableList'
import {
    reorder,
    sendReorder,
    toggleCardBlocked,
    addCard,
    patchList,
} from '@/components/list/utils'

const List = ({ list_id, list, updateList }) => {
    const { title, cards } = list
    const [showAddCard, setShowAddCard] = useState(false)

    const deleteCard = (id) => {
        const payload = {
            ...list,
            cards: cards.filter((card) => card.id != id),
        }
        patchList(list_id, payload)
    }

    const deleteList = async () => {
        mutate(
            '/api/lists',
            function ({ [list_id]: { ...list }, ...otherLists }) {
                return otherLists
            },
            false
        )
        await fetch(`/api/lists/${list_id}`, {
            method: 'DELETE',
        })
        mutate('/api/lists')
    }

    return (
        <div className="flex flex-col w-72 rounded-md p-1 mr-2 bg-gray-200 overflow-x-auto flex-shrink-0 transition-all">
            <Title
                title={title}
                updateTitle={(title) => patchList(list_id, { ...list, title })}
                deleteList={deleteList}
            />
            <div className="flex-grow p-1">
                <DraggableList
                    onDragEnd={(result) => sendReorder(list_id, list, result)}
                    items={cards}
                    component={(card, index) => (
                        <Card
                            title={card.title}
                            key={card.id}
                            isBlocked={card.isBlocked}
                            deleteCard={() => deleteCard(card.id)}
                            toggleCardBlocked={() =>
                                toggleCardBlocked(list_id, list, index)
                            }
                        />
                    )}
                />
                {showAddCard && (
                    <Card
                        key="addCard"
                        isEditable={true}
                        addCard={(title) => {
                            setShowAddCard(false)
                            addCard(list_id, list, title)
                        }}
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
