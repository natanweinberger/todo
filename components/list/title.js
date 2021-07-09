import { useState } from 'react'
import Delete from '@/components/svg/delete'

const Title = ({ title, updateTitle, deleteList }) => {
    const [isInEditMode, setIsInEditMode] = useState(false)

    if (isInEditMode) {
        return (
            <span className="font-bold py-1 self-center">
                <input
                    className="pl-1"
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
        <div className="flex group dark:text-white">
            <div className="w-6" />
            <span
                className="flex-grow font-bold py-1 text-center"
                onClick={() => setIsInEditMode(true)}
            >
                {title}
            </span>
            <div
                className="w-6 invisible group-hover:visible self-center"
                onClick={deleteList}
            >
                <Delete />
            </div>
        </div>
    )
}

export default Title
