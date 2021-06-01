import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// Each item must have a field 'id'
const DraggableList = ({
    items,
    component,
    onDragEnd,
    droppableId,
    direction,
}) => {
    return (
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Droppable droppableId={droppableId} direction={direction}>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        {component(item, index)}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default DraggableList
