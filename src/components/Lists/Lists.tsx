import React, {useState} from 'react';
import ListItem from "./ListItem";
import {useAppSelector} from "../../store/hooks";
import AddTaskDialog from '../Tasks/AddTaskDialog';
import {DragDropContext, Droppable} from 'react-beautiful-dnd'

const Lists = () => {

    const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)
    const [selectedListItemId, setSelectedListItemId] = useState<string | null>(null)

    const lists = useAppSelector((state) => state.listsReducer.lists)

    const renderList = lists.map((listItem) => {
        return (
            <Droppable key={listItem.id} droppableId="list-container">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <ListItem  listItem={listItem} openAddTask={(listItemId) => {
                            setSelectedListItemId(listItemId)
                            setIsAddTaskDialogOpen(true)
                        }}/>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    })

    const handleClose = () => {
        setIsAddTaskDialogOpen(false);
        setSelectedListItemId(null)
    };

    const handleTaskDragAndDrop = (droppedItem: any) => {
        console.log(droppedItem);
    }

    return (

        <>
            <DragDropContext onDragEnd={handleTaskDragAndDrop}>
                {renderList}
            </DragDropContext>
            <AddTaskDialog isOpen={isAddTaskDialogOpen} onClose={handleClose} listItemId={selectedListItemId}/>
        </>
    );
};

export default Lists;