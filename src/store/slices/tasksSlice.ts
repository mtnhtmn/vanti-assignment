import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {v4 as uuidv4} from 'uuid';


export interface IInitialState {
    tasks: ITaskItem[]
}

export interface ITaskItem {
    id: string,
    title: string,
    description: string,
    listId: string,
}


const initialState: IInitialState = {
    tasks: [{id: uuidv4(),title:'Task1',description: 'Task Description', listId: '1'},
        {id:uuidv4(),title:'Task2',description: 'Task Description', listId: '1'},
        {id:uuidv4(),title:'Task3',description: 'Task Description', listId: '1'},
        {id:uuidv4(),title:'Task4',description: 'Task Description', listId: '1'},
        {id:uuidv4(),title:'Task5',description: 'Task Description', listId: '1'},
        {id:uuidv4(),title:'Task6',description: 'Task Description', listId: '1'},]
}

export const tasksSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        createNewTask: (state,action:PayloadAction<{title: string, description: string, listId: string}>) => {
            const taskItem: ITaskItem = {
                id: uuidv4(),
                title: action.payload.title,
                description: action.payload.description,
                listId: action.payload.listId,
            }
            state.tasks.push(taskItem)
        },
        deleteTaskItem: (state,action:PayloadAction<string>) => {
            state.tasks = state.tasks.filter((taskItem) => {
                return taskItem.id !== action.payload;
            })

        },
        editTask: (state, action:PayloadAction<{id: string, title: string, description: string}>) => {
            const taskItemIndex = state.tasks.findIndex((taskItem) => {
                return taskItem.id === action.payload.id
            })
            if (taskItemIndex !== -1) {
                const taskItem = {...state.tasks[taskItemIndex]}
                if (action.payload.title) {
                    taskItem.title = action.payload.title

                }
                if (action.payload.description) {
                    taskItem.description = action.payload.description

                }
                state.tasks[taskItemIndex] = taskItem
            }
        }
    }
})

export const {createNewTask , deleteTaskItem, editTask} = tasksSlice.actions

export default tasksSlice.reducer

