import './App.css';
import * as React from 'react'

const App = () => {

  const json = localStorage.getItem('notes')
  const savedNotes = JSON.parse(json)

  const [notes,setNotes] = React.useState(savedNotes)
  const [noteEditing,setNoteEditing] = React.useState('')

  const addNote = (e) => {
    e.preventDefault();
    const today = new Date()
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    const newNote = {
      id : Math.random().toString(36).substr(2,9),
      text: e.target.note.value,
      date: dateTime
    }
    setNotes([...notes,newNote])
    e.target.note.value = ''
  }

  const editNote = (e, id) => {
    e.preventDefault();
    const today = new Date()
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    const updateNotes = notes.map((note)=> {
      if(note.id === id){
        return{
          id: note.id,
          text: e.target.note.value,
          date: dateTime
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
        <div className='p-4 md:p-12 bg-secondary' style={{border: 'solid 2px'}}>
          <div className='pb-8 text-4xl font-bold text-center serif'>Nako Notes</div>
          <form onSubmit={addNote}>
            <textarea type='text' name='note'  className='w-full p-2 pt-4' resize='none'
              style={{resize:'none', border: 'solid 2px #F3D2C1'}}  rows='2' />
            <br/>
            <button className='px-4 py-1 mt-4 text-xl text-white bg-accent '
              style={{border: 'solid 2px'}}>Simpan</button>
            <br/>
          </form>
          <div className='my-12'>
            {notes.map((note)=> {
              return(
                <>
                  <div id={note.id}>
                    <div className='flex flex-col mt-2'>
                      {note.id !== noteEditing ? (
                        <div className='relative pb-2 break-words' style={{borderBottom:'solid 1px #F3D2C1'}}>{note.text}<br/></div>
                      ) : (
                        <form onSubmit={(e)=> editNote(e, note.id)}>
                          <textarea type='text' name='note' defaultValue={note.text}  className='w-full p-3' resize='none'
                            style={{resize:'none', border: 'solid 2px #F3D2C1'}} />
                          <button type='submit' className='px-3 mt-4 mb-4 text-xl text-white bg-accent ' value='simpan' width='300'
                            style={{border: 'solid 2px'}}>Simpan</button>
                        </form>
                      )}
                      <div className='flex justify-between mt-3'>
                        <div className='-my-2'>
                          <span className='-mt-2 text-sm opacity-60'>{note.date}</span>
                        </div>
                        <div className='pb-8 md:pb-4'>
                          <button onClick={()=> setNoteEditing(note.id)} style={{border: 'solid 2px'}} className='px-3 mx-1 bg-accent'>Edit</button>
                          <button onClick={()=> deleteNotes(note.id)} style={{border: 'solid 2px'}} className='px-3 mx-1 bg-highlight'>Delete</button>

                        </div>

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
