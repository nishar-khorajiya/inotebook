import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{

    const notesInitial=[
        
            {
              "_id": "64aa855a6d059f9e5a7be363",
              "user": "64a936effc0c35ce2232277f",
              "title": "my blog",
              "description": "never give up",
              "tag": "personal",
              "date": "2023-07-09T10:00:58.830Z",
              "__v": 0
            },
            {
              "_id": "64ada05c6a55490378f4c289",
              "user": "64a936effc0c35ce2232277f",
              "title": "my thought",
              "description": "be the one and only",
              "tag": "personal",
              "date": "2023-07-11T18:33:00.254Z",
              "__v": 0
            },
            {
                "_id": "64aa855a6d059f9e5a7be363",
                "user": "64a936effc0c35ce2232277f",
                "title": "my blog",
                "description": "never give up",
                "tag": "personal",
                "date": "2023-07-09T10:00:58.830Z",
                "__v": 0
              },
              {
                "_id": "64ada05c6a55490378f4c289",
                "user": "64a936effc0c35ce2232277f",
                "title": "my thought",
                "description": "be the one and only",
                "tag": "personal",
                "date": "2023-07-11T18:33:00.254Z",
                "__v": 0
              },
              {
                "_id": "64aa855a6d059f9e5a7be363",
                "user": "64a936effc0c35ce2232277f",
                "title": "my blog",
                "description": "never give up",
                "tag": "personal",
                "date": "2023-07-09T10:00:58.830Z",
                "__v": 0
              },
              {
                "_id": "64ada05c6a55490378f4c289",
                "user": "64a936effc0c35ce2232277f",
                "title": "my thought",
                "description": "be the one and only",
                "tag": "personal",
                "date": "2023-07-11T18:33:00.254Z",
                "__v": 0
              },
              {
                "_id": "64aa855a6d059f9e5a7be363",
                "user": "64a936effc0c35ce2232277f",
                "title": "my blog",
                "description": "never give up",
                "tag": "personal",
                "date": "2023-07-09T10:00:58.830Z",
                "__v": 0
              },
              {
                "_id": "64ada05c6a55490378f4c289",
                "user": "64a936effc0c35ce2232277f",
                "title": "my thought",
                "description": "be the one and only",
                "tag": "personal",
                "date": "2023-07-11T18:33:00.254Z",
                "__v": 0
              }
          
        ]
 
        const [notes,setNotes]=useState(notesInitial)
  
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;