import { useSelector } from "react-redux";
import Note from "../Note/Notes";
import "./NotesList.css"
import { useEffect, useState } from "react";

const NotesList = () => {

    const notes = useSelector(state => state.notes.list)
    const [list, setList] = useState([])
    const [search, setSearch] = useState("")
    const [isSearched, setIsSearched] = useState(false)
    const [isFiltered, setIsFiltered] = useState(true)
    const [filter, setFilter] = useState("title")

    useEffect(() => {
        if (!search) {
            console.log(sortByFilter(notes))
            const filtered = sortByFilter(notes);
            setList(filtered)
        }
    }, [notes])

    useEffect(() => {
        if (list.length > 0) {
            setIsFiltered(false)
            setTimeout(() => {
                const filtered = sortByFilter(list);
                setList(filtered)
                setIsFiltered(true)
            }, 500);
        }
    }, [filter])

    const sortByFilter = (data) => {
        const list = [...data]
        const filtered = list?.sort((a, b) => {
            if (["dateCreated", "dateModified"].includes(filter)) {
                return new Date(b[filter]) - new Date(a[filter]);
            }
            if (["title"].includes(filter)) {
                if (a[filter] < b[filter]) {
                    return -1;
                }
                if (a[filter] > b[filter]) {
                    return 1;
                }
                return 0;
            }
            return b[filter] - a[filter];
        });
        return filtered;
    }

    const searchHandler = () => {
        setIsSearched(true)
        const filtedNotes = notes.filter(note => note.title.toLowerCase().includes(search.toLowerCase()) || note.body.toLowerCase().includes(search.toLowerCase()))
        const filtered = sortByFilter(filtedNotes);
        setList(filtered)
    }
    const clearSearchHandler = () => {
        setIsSearched(false)
        setSearch("")
        const filtered = sortByFilter(notes);
        setList(filtered)
    }

    return <div className="notes-list-main">
        <h2 className="list-title">Notes</h2>
        <div className="search-box">
            <input
                type="text"
                placeholder="Enter keyword to search"
                onChange={e => setSearch(e.currentTarget.value)}
                value={search}
                disabled={isSearched}
                className="input-search"
            />
            {!isSearched && <button
                type="button"
                className="button"
                onClick={searchHandler}
                disabled={!search}
            >
                Search
            </button>}
            {isSearched && <button
                type="button"
                className="button"
                onClick={clearSearchHandler}
            >
                Reset
            </button>}
        </div>
        <div className="filter-box">
            <select className="select-filter" onChange={e => setFilter(e.target.value)}>
                <option value="title">Order by Title</option>
                <option value="dateCreated">Order by Date Created</option>
                <option value="dateModified">Order by Date Modified</option>
            </select>
        </div>
        <div className="list">
            {isFiltered ? list?.map(note => <Note note={note} key={note.id} />) : <p>Filtering</p>}
        </div>
    </div>
}
export default NotesList;