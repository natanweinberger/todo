import { useState } from 'react'

const Title = ({ title, updateTitle }) => {
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
        <span
            className="font-bold py-1 self-center"
            onClick={() => setIsInEditMode(true)}
        >
            {title}
        </span>
    )
}

export default Title
