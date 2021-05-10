const Delete = () => {
    const factor = 2
    const viewBoxStart = 0 - 120 * factor
    const viewBoxEnd = 329 + 120 * 2 * factor
    return (
        <svg
            viewBox={`${viewBoxStart} ${viewBoxStart} ${viewBoxEnd} ${viewBoxEnd}`}
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current text-gray-700 hover:text-red-700"
        >
            <g>
                <path d="m21.339844 329.398438c-5.460938 0-10.925782-2.089844-15.082032-6.25-8.34375-8.339844-8.34375-21.824219 0-30.164063l286.589844-286.59375c8.339844-8.339844 21.824219-8.339844 30.164063 0 8.34375 8.339844 8.34375 21.824219 0 30.164063l-286.589844 286.59375c-4.183594 4.179687-9.621094 6.25-15.082031 6.25zm0 0" />
                <path d="m307.929688 329.398438c-5.460938 0-10.921876-2.089844-15.082032-6.25l-286.589844-286.59375c-8.34375-8.339844-8.34375-21.824219 0-30.164063 8.339844-8.339844 21.820313-8.339844 30.164063 0l286.589844 286.59375c8.34375 8.339844 8.34375 21.824219 0 30.164063-4.160157 4.179687-9.621094 6.25-15.082031 6.25zm0 0" />
            </g>
        </svg>
    )
}

const Card = ({
    title,
    isBlocked,
    isEditable,
    updateList,
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
                    : 'bg-gray-50 hover:bg-green-100'
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
                    <div className="flex-grow p-1" onClick={updateList}>
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
