import { configureStore } from '@reduxjs/toolkit'
import { notesSlice } from '../reducer/notes'

export default configureStore({
    reducer: {
        notes: notesSlice.reducer
    }
})

