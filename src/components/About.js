import { React, useContext, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import noteContext from '../context/notes/noteContext'

const About = () => {

    const a = useContext(noteContext)
   
    return (
        <div>About</div>

    )
}

export default About