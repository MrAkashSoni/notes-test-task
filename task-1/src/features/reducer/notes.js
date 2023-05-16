import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

const notes = JSON.parse(localStorage.getItem("notes"))
const list = notes?.length > 0 ? notes : [];

export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        list,
        currentNote: {}
    },
    reducers: {
        addNote: (state, action) => {
            const note = {
                id: uuidv4(),
                title: action.payload.title,
                body: action.payload.body,
                dateCreated: new Date(),
                dateModified: null,
            }
            state.list.push(note);
            localStorage.setItem("notes", JSON.stringify(state.list))
        },
        updateNote: (state, action) => {
            const idx = state.list.findIndex(note => note.id === action.payload.id);
            const note = state.list[idx]
            note.title = action.payload.title;
            note.body = action.payload.body;
            note.dateModified = new Date();
            state.list[idx] = note;
            localStorage.setItem("notes", JSON.stringify(state.list))
        },
        deleteNote: (state, action) => {
            const notes = state.list.filter(note => note.id !== action.payload.id);
            state.list = notes;
            localStorage.setItem("notes", JSON.stringify(state.list))
        },
        setCurrentNote: (state, action) => {
            const list = state.list
            const idx = list.findIndex(note => note.id === action.payload.id);
            const note = list[idx]
            state.currentNote = note;
        },
        clearCurrentNote: (state, action) => {
            state.currentNote = {}
        }
    }
})

export const { addNote, updateNote, deleteNote, setCurrentNote, clearCurrentNote } = notesSlice.actions