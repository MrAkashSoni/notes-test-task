import { useDispatch } from "react-redux";
import { setCurrentNote } from "../../features/reducer/notes";
import "./Notes.css"

const Note = ({ note }) => {
    const { title = null, body = null, id = null, dateCreated = null, dateModified = null } = note
    const dispatch = useDispatch();

    return id && <div className="note">
        <h3 className="title">{title}</h3>
        <p className="body">{body}</p>
        <button
            type="button"
            className="button"
            onClick={() => dispatch(setCurrentNote({ id }))}
        >
            View
        </button>
    </div>
}
export default Note;