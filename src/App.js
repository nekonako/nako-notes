import './App.css';
import * as React from 'react'

const App = () => {
  const [notes,setNotes] = React.useState([])
  const [noteEditing,setNoteEditing] = React.useState('')

  const addNote = (e) => {
    e.preventDefault();
    const newNote = {
      id : Math.random().toString(36).substr(2,9),
      text: e.target.note.value
    }
    setNotes([...notes,newNote])
    e.target.note.value = ''
  }

  const editNote = (e, id) => {
    e.preventDefault();
    const updateNotes = notes.map((note)=> {
      if(note.id === id){
        return{
          id: note.id,
          text: e.target.note.value
        }
      } else {
        return note
      }
    })
    setNotes(updateNotes)
    setNoteEditing('')
  }

  const deleteNotes = (id) => {
    const filteredNotes = notes.filter((note)=>note.id !== id);
    setNotes(filteredNotes)
  }
  React.useEffect(()=>{
    const json = JSON.stringify(notes)
    localStorage.setItem('notes', json)
  },[notes])

  React.useEffect(()=>{
    const json = localStorage.getItem('notes')
    const savedNotes = JSON.parse(json)
    if(savedNotes){
      setNotes(savedNotes)
    }
  },[])


  return (
    <>
      <div className='min-h-screen p-4 text-base md:p-32 bg-primary md:text-lg'>
        <div className='p-12 bg-secondary' style={{border: 'solid 2px'}}>
          <div className='pb-8 text-4xl font-bold text-center serif'>Nako Notes</div>
          <form onSubmit={addNote}>
            <textarea type='text' name='note'  className='w-full p-3' resize='none'
              style={{resize:'none', border: 'solid 2px #F3D2C1'}} />
            <br/>
            <button className='p-4 py-2 mt-4 text-xl text-white bg-accent '
              style={{border: 'solid 2px'}}>Submit</button>
            <br/>
          </form>
          <div className='my-12'>
            {notes.map((note)=> {
              return(
                <>
                  <div id={note.id}>
                    <div className='flex flex-row justify-between mt-2'>
                      {note.id !== noteEditing ? (
                        <div className='w-4/5' style={{borderBottom:'solid 2px #F3D2C1'}}>{note.text}</div>
                      ) : (
                        <form onSubmit={(e)=> editNote(e, note.id)}>
                          <textarea type='text' name='note' defaultValue={note.text}  className='w-full p-3' resize='none'
                            style={{resize:'none', border: 'solid 2px #F3D2C1'}} />
                          <button type='submit' className='p-4 py-2 mt-4 text-xl text-white bg-accent ' value='simpan' width='300'
                            style={{border: 'solid 2px'}}>Edit</button>
                        </form>
                      )}
                      <div className='w-auto'>
                        <button onClick={()=> setNoteEditing(note.id)} style={{border: 'solid 2px'}} className='p-1 px-3 mx-1 bg-accent'>Edit</button>
                        <button onClick={()=> deleteNotes(note.id)} style={{border: 'solid 2px'}} className='p-1 px-3 mx-1 bg-highlight'>Delete</button>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
