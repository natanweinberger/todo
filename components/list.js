import Card from './Card';
import Divider from './Divider';

const Title = ({ title }) => (
    <span className="font-bold py-1 self-center">{title}</span>
);

const List = ({ list, list_id, updateData, ...props }) => {
    const { title, cards, isBlockedIndex } = list;
    const updateList = (index) =>
        updateData(list_id, { ...list, isBlockedIndex: index });
    return (
        <div className="flex flex-col w-72 rounded-md p-2 mr-2 bg-gray-200 overflow-x-auto flex-shrink-0">
            <Title title={title} />
            {cards.map((card, index) => {
                return (
                    <div>
                        <Card
                            key={card.id}
                            {...card}
                            isBlocked={index > isBlockedIndex ? true : false}
                            updateList={() => updateList(index)}
                            {...props}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default List;
