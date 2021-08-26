import React, { useState } from 'react'
import { FaPaw, FaPoop, FaHamburger } from 'react-icons/fa'

function NewLogForm({animal, toggleShowNewLogForm, addLog}) {
  const [log_time, set_log_time] = useState("")
  const [pooped, set_pooped] = useState(false)
  const [fed, set_fed] = useState(false)
  const [note, set_note] = useState("")

  console.log({
    log_time,
    pooped,
    fed,
    note
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const body = JSON.stringify({
      updated_at: log_time,
      pooped,
      animal_id: animal.id,
      note
    })
    const res = await fetch(`${process.env.REACT_APP_API_URL}/animal_logs`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    const newLog = await res.json()

    addLog(newLog)
  
  }

  return (
  <div className="w-full max-w-xs">
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <span className="mb-4 pb-1 pt-2 w-8 block text-gray-700 text-lg font-bold"><input required type="datetime-local" onChange={e => set_log_time(e.target.value)}/></span>
      <span className="flex" style={{paddingRight: "10px"}}>
        <label className ="mb-2" htmlFor="fed">
          Fed ?
          <FaHamburger className="mb-1"
            style={{ color: fed ? '#000' : '#bbb' }}
            size={20}
          />
         
        </label>
        <input 
          className="hidden" 
          id="fed" 
          type="checkbox"
          onChange={(e) => set_fed(e.target.checked) }
        />
        </span>
        <span className="flex" style={{paddingRight: "10px"}}>
        <label htmlFor="pooped">
          Pooped? 
          <FaPoop className="mb-5"
            style={{ color: pooped ? '#000' : '#bbb' }}
            size={20}
          />
        </label>
        <input 
          className="hidden" 
          id="pooped" 
          type="checkbox"
          onChange={(e) => set_pooped(e.target.checked) }
        />
        </span>
        <span className="flex" style={{paddingRight: "10px"}}>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" style={{border:"1px solid balck"}} placeholder="note..." onChange={(e)=> set_note(e.target.value)}></input>
      </span>
      
      <span className="flex items-center mt-4">
        <button className="bg-gray-100 hover:bg-gray-300 px-4 py-2 mr-2 rounded-full" onClick={toggleShowNewLogForm}>Cancel</button>
        <button className="flex bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-full" type="submit"><FaPaw size={20} /> Add Log</button>
      </span>
    </form>
  </div>
  )
}

export default NewLogForm
