import React,{useContext, useEffect}from 'react'
import noteContext from '../context/notes/noteContext'
import Notesitem from './Notesitem';
import AddNote from './AddNote';



const Notes = () => {

    const context=useContext(noteContext);
    const {notes,getNotes}= context;
    useEffect(()=>{
      getNotes()

    },[])

  return (
       <>
        <AddNote/>
        <h2>your Notes</h2>
        
        <div className="row my-3">
            
            
            {notes.map((note)=>{

return <Notesitem key={note._id} note={note}/>

})}
</div>
</>
      

  )
}

export default Notes
