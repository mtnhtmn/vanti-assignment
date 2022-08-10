import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import {createNewTask} from "../../store/slices/tasksSlice";
import {useDispatch} from "react-redux";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface IProps {
    isOpen:boolean;
    listItemId:string | null;
    onClose: () => void
}


const AddTaskDialog = ({listItemId, onClose,isOpen}: IProps) => {
    const dispatch = useDispatch()
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const onAddTask = () => {
        if(listItemId){
            dispatch((createNewTask({listId:listItemId, title: taskTitle, description: taskDescription})))
            onClose();
        }
    }

    
    React.useEffect(()=>{
        if(!isOpen){
            setTaskTitle('')
            setTaskDescription('')
        }
    },[isOpen])
    
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <TextField id="standard-basic" label="Title" variant="standard"
                           value={taskTitle}
                           onChange={(event) => {
                               setTaskTitle(event.target.value)
                           }}/>
            </DialogTitle>
            <DialogContent>
                <TextField
                    id="filled-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    variant="filled"
                    value={taskDescription}
                    onChange={(event) => {
                        setTaskDescription(event.target.value)
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onAddTask} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTaskDialog;