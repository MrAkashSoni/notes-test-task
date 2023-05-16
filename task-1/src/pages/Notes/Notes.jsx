import NoteEditor from "../../components/NoteEditor/NoteEditor"
import NotesList from "../../components/NotesList/NotesList";
import "./Notes.css"

const Notes = () => {
    return <div className="notes-main">
        <div className="notes-lists">
            <NotesList />
        </div>
        <div className="note-editor">
            <NoteEditor />
        </div>
    </div>
}
export default Notes;