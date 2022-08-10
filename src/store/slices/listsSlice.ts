import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {v4 as uuidv4} from 'uuid';

interface IInitialState {
    lists: IListItem[]
}

export interface IListItem {
    id: string,
    title: string,
}


const initialState: IInitialState = {
    lists: [{id:'1',title:'List1'}]
}

export const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        createNewList: (state,action:PayloadAction<string>) => {
            const listItem: IListItem = {
                id: uuidv4(),
                title: action.payload,
            }
            state.lists.push(listItem)
        },
        deleteListItem: (state,action:PayloadAction<string>) => {
            state.lists = state.lists.filter((listItem) => {
                return listItem.id !== action.payload;
            })

        },
        editList: (state, action:PayloadAction<{id: string, title: string}>) => {
            const listItemIndex = state.lists.findIndex((listItem) => {
                return listItem.id === action.payload.id
            })
            if (listItemIndex !== -1) {
                const listItem = {...state.lists[listItemIndex]}
                listItem.title = action.payload.title
                state.lists[listItemIndex] = listItem
            }
        }
    }
})

export const {createNewList , deleteListItem, editList} = listsSlice.actions

export default listsSlice.reducer

