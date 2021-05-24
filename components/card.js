import { useEffect } from 'react'
import Delete from '@/components/svg/delete'

const Card = ({
    title,
    isBlocked,
    isEditable,
    toggleCardBlocked,
    addCard,
    hideAddCard,
    deleteCard,
}) => {
    const handleKeyPress = (e) => e.key == 'Enter' && addCard(e.target.value)

    return (
        <div
            className={`flex group rounded-md p-2 mb-2 shadow-md text-left hover:cursor-pointer border-box
            ${
                isBlocked
                    ? 'bg-gray-200 hover:bg-green-300 text-gray-700'
                    : 'bg-white hover:bg-green-100'
            } `}
        >
            {isEditable ? (
                <input
                    autoFocus
                    className="bg-gray-200 shadow-inner rounded-sm p-2 flex-1"
                    id="email"
                    type="email"
                    aria-label="email address"
                    placeholder={title}
                    onKeyPress={handleKeyPress}
                    onBlur={hideAddCard}
                />
            ) : (
                <div className="flex w-full">
                    <div className="flex-grow p-1" onClick={toggleCardBlocked}>
                        {title}
                    </div>
                    <div
                        className="flex-none w-7 align-right self-center invisible group-hover:visible"
                        onClick={deleteCard}
                    >
                        <Delete />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Card
