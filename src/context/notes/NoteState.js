import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState= (props)=>{
  const host= "http://localhost:5000"
   const notesInitial=[]

  const [notes,setNotes]= useState(notesInitial)

    //Get all Note
    const getNotes=async()=>{
      //TODO: API Call
      
      const response = await fetch('${host}/api/notes/fetchallnotes', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      
        headers: {
          'Content-Type': "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZDFlZjE3MjNkNWI2MzM2M2NlY2ZjIn0sImlhdCI6MTY4Mzk4MTAxOX0.gEhDuH9TL0veRs2yzdXG3do6nojJu4GZvoWbIpranzA"
          
        }
        
        
      });
    
  console.log("Hello1");
      const json= await response.json();
      console.log("Hello2");
      console.log(json)
      setNotes(json)
      
    
}
  

  //Add a Note
   const addNote=async(title,description,tag)=>{
    //TODO: API Call
    const response = await fetch('${host}/api/notes/addnote', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
    
      headers: {
        "Content-Type": "application/json",
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZDFlZjE3MjNkNWI2MzM2M2NlY2ZjIn0sImlhdCI6MTY4Mzk4MTAxOX0.gEhDuH9TL0veRs2yzdXG3do6nojJu4GZvoWbIpranzA"
        
      },
      
      body: JSON.stringify({title, description, tag})
    });
    const json= response.json(); 
    console.log("Adding a new note")

    const note={
      "_id": "646083716cfa58a4f4187cb9",
      "user": "645d1ef1723d5b63363cecfc",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-05-14T06:45:05.309Z",
      "__v": 0
};
 setNotes(notes.concat(note))

   }


  //Delete a Note
  const deleteNote=(id)=>{
    console.log("Deleting the note with id"+id);
    const newNotes=notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
    
  }



  //Edit a Note
  const editNote=async (id,title,description,tag)=>{
  //API call 

  const response = await fetch('${host}/api/notes/updatenote/${id}', {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
  
    headers: {
      "Content-Type": "application/json",
      "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZDFlZjE3MjNkNWI2MzM2M2NlY2ZjIn0sImlhdCI6MTY4Mzk4MTAxOX0.gEhDuH9TL0veRs2yzdXG3do6nojJu4GZvoWbIpranzA"
      
    },
    
    body: JSON.stringify({title, description, tag})
  });
  const json= response.json(); 



 //logic to edit in client
    for(let index=0;index<notes.length;index++)
    {
      const element=notes[index];
      if(element._id===id)
      {
        element.title=title;
        element.description=description;
        element.tag=tag;
      }
    }
  }  
  
  

   
      return(
              <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>


                {props.children}
              </NoteContext.Provider>
          


      )
      }

export default NoteState;