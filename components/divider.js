const Divider = ({ onClick }) => {
    const width = 50;
    const height = 2;
    const horizontalPadding = 2;
    const verticalPadding = 1;

    const lineThickness = 0.5;

    return (
        <div className="group hover:cursor-pointer" onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${width} ${height}`}
                className="visible group-hover:visible md:invisible"
            >
                <line
                    x1={`${horizontalPadding}`}
                    y1={`${height / 2}`}
                    x2={`${width - horizontalPadding}`}
                    y2={`${height / 2}`}
                    stroke="#555"
                    stroke-width={`${lineThickness}`}
                    stroke-linecap="round"
                />
                <circle
                    cx={`${width / 2}`}
                    cy={`${height / 2}`}
                    r={`${height / 2}`}
                    fill="#fff"
                />
                <line
                    x1={`${width / 2 - height / 4}`}
                    y1={`${height / 2}`}
                    x2={`${width / 2 + height / 4}`}
                    y2={`${height / 2}`}
                    stroke="#222"
                    stroke-width={lineThickness}
                    stroke-linecap="round"
                />
                <line
                    x1={`${width / 2}`}
                    y1={`${height / 2 - height / 4}`}
                    x2={`${width / 2}`}
                    y2={`${height / 2 + height / 4}`}
                    stroke="#222"
                    stroke-width={lineThickness}
                    stroke-linecap="round"
                />
            </svg>
        </div>
    );
};

export default Divider;
