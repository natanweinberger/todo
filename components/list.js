import { useState } from 'react';
import Card from './Card';
import Divider from './Divider';

const Title = ({ title }) => (
    <span className="font-bold py-1 self-center">{title}</span>
);

const List = ({ list, list_id, updateList, ...props }) => {
    const { title, cards, isBlockedIndex } = list;
    const [activeCards, setActiveCards] = useState(cards)
    const updateCardOrder = (index) => {
        let updatedCards = [...cards]
        updatedCards[index] = {...cards[index], isBlocked: !cards[index].isBlocked}
        updateList({ ...list, cards: updatedCards });
    }
    const addCard = (title) => {
        let updatedCards = [...cards]
        updatedCards.push({title, id: title, isBlocked: false, content: null, position: cards.length})
        updatedCards = updatedCards.filter(card => !card.isEditable)
        updateList({...list, cards: updatedCards})
    }
    return (
        <div className="flex flex-col w-72 rounded-md p-1 mr-2 bg-gray-200 overflow-x-auto flex-shrink-0 transition-all">
            <Title title={title} />
            <div className='flex-grow overflow-y-auto p-1'>
            {cards.map((card, index) => {
                return (
                        <Card
                            key={card.id}
                            updateList={() => updateCardOrder(index)}
                            addCard={addCard}
                            {...card}

                        />
                );
            })}
            </div>
            <div className="rounded-md p-2 text-sm text-gray-600 hover:bg-gray-300 hover:text-gray-800"
                 onClick={() => updateList({...list, cards: [...cards, {id: list.cards.length, title: list.cards.length, isBlocked: false, isEditable: true}]}, false)}>
                + &nbsp; Add a card
            </div>
      </div>
    );
};

export default List;
