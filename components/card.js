const Hand = () => (
    <svg viewBox="-64 0 485 486" xmlns="http://www.w3.org/2000/svg">
        <path d="m91.320312 486h98.019532c32.964844 0 63.371094-18.976562 79.351562-49.675781l87.394532-167.847657c1.738281-3.335937.910156-7.433593-1.988282-9.828124l-8.984375-7.4375c-10.375-9.644532-24.28125-14.5625-38.410156-13.589844-14.425781 1.058594-27.761719 8.066406-36.816406 19.34375l-10.289063 12.527344-.125-182.511719c-.015625-22.222657-17.332031-40.300781-38.378906-40.300781-8.257812 0-15.351562 2.785156-22.351562 7.507812v-14.054688c0-22.234374-16.753907-40.132812-37.808594-40.132812h-.707032c-19.132812 0-35.023437 14.847656-37.765624 34.261719-6.433594-5.089844-14.394532-7.871094-22.601563-7.898438-21.054687-.003906-38.117187 18.042969-38.117187 40.28125v40.457031c-6-4.734374-14.054688-7.101562-22.316407-7.101562h-.671875c-21 0-38.132812 17.835938-38.183594 40.011719-.132812 57.515625-.050781 158.941406.035157 249.679687.050781 53.214844 40.746093 96.308594 90.714843 96.308594zm-74.75-345.949219c.03125-13.378906 9.984376-24.050781 22.183594-24.050781h.671875c12.230469 0 22.316407 10.492188 22.316407 23.910156v105.199219c0 4.417969 3.582031 8 8 8 4.421874 0 8-3.582031 8-8v-178.464844c0-13.414062 9.734374-24.332031 22.035156-24.332031 12.234375 0 21.964844 10.917969 21.964844 24.332031v178.472657c0 4.417968 3.582031 8 8 8 4.421874 0 8-3.582032 8-8v-204.972657c0-13.417969 10.25-24.144531 22.484374-24.144531h.707032c12.230468 0 22.183594 10.816406 22.183594 24.226562v45.613282c-.011719.402344-.015626.789062-.015626 1.199218 0 .175782 0 .339844.015626.511719 0 20.273438-.007813 42.230469-.011719 63.140625-.011719 48.496094-.019531 90.371094 0 94.457032.015625 4.417968 3.609375 7.988281 8.027343 7.972656 4.417969-.015625 7.988282-3.609375 7.972657-8.027344-.015625-4.058594-.007813-45.925781 0-94.402344 0-21.425781.007812-43.949218.011719-64.636718.464843-12.972657 10.230468-23.367188 22.175781-23.367188 12.21875 0 22.171875 10.90625 22.179687 24.3125l.144532 204.828125c.003906 3.378906 2.125 6.390625 5.304687 7.527344 3.179687 1.140625 6.730469.15625 8.875-2.453125l24.457031-29.769532c6.277344-7.867187 15.535156-12.769531 25.570313-13.539062 9.816406-.648438 19.460937 2.8125 26.621093 9.554688.101563.09375.203126.183593.308594.269531l4.160156 3.449219-84.414062 162.070312c-13.214844 25.386719-38.183594 41.0625-65.160156 41.0625h-98.019532c-41.15625 0-74.671874-35.921875-74.714843-80.324219-.085938-90.726562-.167969-192.136719-.035157-249.625zm0 0" />
    </svg>
);

const Card = ({ title, isBlocked, setIsModalShowing, isEditable, updateList, addCard}) => {
    const onEnter = (e) => {e.key == "Enter" && addCard(e.target.value)}
    return <div
        className={`flex group rounded-md p-2 mb-2 shadow-md text-left hover:cursor-pointer
            ${
                isBlocked
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    : 'bg-gray-50 hover:bg-gray-100'
            } `}
        onClick={updateList}
    >
        
        {isEditable ? 
            <input className='bg-gray-200 shadow-inner rounded-sm p-2 flex-1' id='email' type='email' aria-label='email address' placeholder={title} onKeyPress={onEnter}/>
        : 
        <div className="flex w-full">
        <div className="flex-grow p-1">{title}</div>
        <div className="flex-none w-6 align-right self-center invisible group-hover:visible">
            <Hand />
        </div>
        </div>
    }

    </div>
};

export default Card;
