import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import {deleteTaskItem, ITaskItem} from "../../store/slices/tasksSlice";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch} from "../../store/hooks";



interface IProps {
    taskItem: ITaskItem
    openEditDialog: ()=> void,
}

const TaskItem = ({taskItem, openEditDialog}:IProps) => {

    const dispatch = useAppDispatch()


    return (
        <Card>
            <CardContent>
                <Typography variant={'h4'} color="text.secondary" gutterBottom>
                    {taskItem.title}
                </Typography>
                <Typography variant="body2">
                    {taskItem.description}
                </Typography>
            </CardContent>
            <CardActions>
                    <IconButton aria-label="edit" color={'info'} onClick={(event) => {
                        event.stopPropagation()
                        openEditDialog()
                    }}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton aria-label="delete" color={'error'} onClick={(event) => {
                        event.stopPropagation()
                        dispatch(deleteTaskItem(taskItem.id))
                    }}>
                        <DeleteIcon/>
                    </IconButton>
            </CardActions>
        </Card>
    );
};

export default TaskItem;