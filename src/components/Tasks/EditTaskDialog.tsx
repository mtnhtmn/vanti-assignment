import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import {editTask, ITaskItem} from "../../store/slices/tasksSlice";
import {useDispatch} from "react-redux";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface IProps {
    taskItem: ITaskItem | null
    onClose: () => void
}


const EditTaskDialog = ({taskItem, onClose}: IProps) => {
    const dispatch = useDispatch()
    const [editTaskTitle, setEditTaskTitle] = useState('')
    const [editTaskDescription, setEditTaskDescription] = useState('')
    const onEditTask = () => {
        if (taskItem) {
            dispatch((editTask({id: taskItem.id, title: editTaskTitle, description: editTaskDescription})))
            onClose();
        }
    }

    return (
        <Dialog
            open={!!taskItem}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <TextField id="standard-basic" label="Title" variant="standard"
                           defaultValue={taskItem?.title ?? ''}
                           onChange={(event) => {
                               setEditTaskTitle(event.target.value)
                           }}/>
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="filled-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    variant="filled"
                    defaultValue={taskItem?.description ?? ''}
                    onChange={(event) => {
                        setEditTaskDescription(event.target.value)
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onEditTask} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTaskDialog;