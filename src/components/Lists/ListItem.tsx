import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {deleteListItem, editList, IListItem} from "../../store/slices/listsSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useState} from "react";
import Button from '@mui/material/Button';
import Tasks from "../Tasks/Tasks";
import TextField from '@mui/material/TextField';

interface IProps {
    listItem: IListItem
    openAddTask: (listItemId: string) => void
}

export default function ListItem({listItem, openAddTask}: IProps) {
    const [showEditTitleInput, setShowEditTitleInput] = useState(false)
    const [newListItemTitle, setNewListItemTitle] = useState('')
    const dispatch = useAppDispatch()
    const tasks = useAppSelector((state) => state.tasksReducer.tasks)

    const tasksForList = tasks.filter((taskItem) => {
        return taskItem.listId === listItem.id;

    })

    const renderTitle = () => {
        if (showEditTitleInput) {
            return (
                <Box>
                    <TextField size='small' defaultValue={listItem.title} onClick={() => {
                    }} onChange={(event) => {
                        setNewListItemTitle(event.target.value)
                    }
                    }/>
                    <Button onClick={() => {
                        dispatch(editList({id: listItem.id, title: newListItemTitle}))
                        setShowEditTitleInput(false)
                    }}>
                        Save
                    </Button>
                    <Button onClick={() => {
                        setShowEditTitleInput(false)
                    }}>
                        Cancel
                    </Button>
                </Box>
            )
        }
        return <Typography>{listItem.title}</Typography>
    }

    const renderButtons = () => {
        return (
            <Stack onClick={(event) => {
                event.stopPropagation()
            }} alignItems='center' direction='row' spacing={1}>
                {renderTitle()}
                <Button variant="outlined" color={'info'} size='small' startIcon={<AddIcon/>} onClick={() => {
                    openAddTask(listItem.id)
                }}>
                    Add Task
                </Button>
                <Button disabled={showEditTitleInput} variant="outlined" color={'info'} size='small'
                        startIcon={<EditIcon/>} onClick={() => {
                    setShowEditTitleInput(true)
                }}>
                    Edit
                </Button>

                <Button variant="outlined" color={'error'} size='small' startIcon={<DeleteIcon/>} onClick={() => {
                    dispatch(deleteListItem(listItem.id))
                }}>
                    Delete
                </Button>

            </Stack>

        )
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    {renderButtons()}
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Tasks tasksForList={tasksForList}/>
            </AccordionDetails>
        </Accordion>
    );
}
