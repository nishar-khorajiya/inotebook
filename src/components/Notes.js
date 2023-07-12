
import { React, useContext,useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import { Noteitem } from './Noteitem'
import AddNote from './AddNote'

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getNote } = context

    useEffect(()=>{
        getNote();
    },[])
    return (
        <>
        <AddNote/>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitem note={note} />
                })
                }
            </div>
        </>
    )
}

export default Notes