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
    <form onSubmit={handleSubmit} className="">
      <span className="pb-1 pt-2 w-8"><input required type="datetime-local" onChange={e => set_log_time(e.target.value)}/></span>
      <span className="flex" style={{paddingRight: "10px"}}>
        <label htmlFor="fed">
          <FaHamburger
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
          <FaPoop
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
        <input type="text" style={{border:"1px solid balck"}} placeholder="note..." onChange={(e)=> set_note(e.target.value)}></input>
      </span>
      
      <span className="flex items-center">
        <button className="bg-gray-100 px-4 py-2 mr-2" onClick={toggleShowNewLogForm}>Cancel</button>
        <button className="flex bg-green-600 px-4 py-2 text-white" type="submit"><FaPaw size={20} /> Add Log</button>
      </span>
    </form>
  )
}

export default NewLogForm
