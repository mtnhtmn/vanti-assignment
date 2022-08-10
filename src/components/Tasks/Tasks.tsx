import Grid from '@mui/material/Grid';
import React, {useState} from 'react';
import TaskItem from "./TaskItem";
import {ITaskItem} from "../../store/slices/tasksSlice";
import EditTaskDialog from './EditTaskDialog';
import {Draggable} from 'react-beautiful-dnd';

interface IProps {
    tasksForList: ITaskItem[]
}

const Tasks = ({tasksForList}: IProps) => {

    const [selectTaskToEdit, setSelectTaskToEdit] = useState<ITaskItem | null>(null)

    const renderTasks = tasksForList.map((taskItem, index) => {
        return (
            <Grid key={taskItem.id} item xs={3}>
            <Draggable draggableId={taskItem.id} index={index}>
                {(provided) => (
                    <div ref={provided.innerRef}
                         {...provided.dragHandleProps}
                         {...provided.draggableProps}>

                            <TaskItem taskItem={taskItem} openEditDialog={() => {
                                setSelectTaskToEdit(taskItem)
                            }}/>
                    </div>
                )}
            </Draggable>
            </Grid>
        )
    })

    const handleClose = () => {
        setSelectTaskToEdit(null);
    };


    return (
        <>
            <Grid container spacing={2}>
                {renderTasks}
            </Grid>
            <EditTaskDialog taskItem={selectTaskToEdit} onClose={handleClose}/>
        </>

    );
};

export default Tasks;