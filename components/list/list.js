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
        await fetch(`/api/lists/${list_id}`, {
            method: 'DELETE',
        })
        mutate('/api/lists')
    }

    // Advanced: PATCH and use result to mutate
    // const updateTitle = async (title) => {
    //     mutate('/api/lists', async (lists) => {
    //         const updatedList = await fetch(`/api/lists/${list_id}`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ title }),
    //         }).then((res) => res.json())
    //         const result = lists.map((list) => {
    //             if (list.id == list_id) {
    //                 return { ...list, ...updatedList }
    //             } else {
    //                 return list
    //             }
    //         })
    //         return result
    //     })
    // }

    // Naive: PATCH and GET
    const updateTitle = async (title) => {
        mutate(
            '/api/lists',
            (lists) => {
                return lists.map((l) => {
                    if (l.id == list_id) {
                        return { ...l, title }
                    }
                    return l
                })
            },
            false
        )
        await fetch(`/api/lists/${list_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        })
        mutate('/api/lists')
    }

    return (
        <div className="flex flex-col w-72 rounded-md p-1 mr-2 bg-antique dark:bg-gray-700 shadow-lg flex-shrink-0">
            <Title
                title={title}
                updateTitle={updateTitle}
                deleteList={deleteList}
            />
            <div className="flex-grow p-1 overflow-y-auto">
                <DraggableList
                    onDragEnd={(result) => sendReorder(list_id, list, result)}
                    items={cards}
                    droppableId="droppable"
                    component={(card, index) => (
                        <Card
                            title={card.text}
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
                            addCard(list_id, title)
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
