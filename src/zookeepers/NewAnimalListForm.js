import React, { useState } from 'react'
import { FaPaw } from 'react-icons/fa'

function NewAnimalListForm({zookeeper, toggleShowNewAnimalListForm, addLog, animals, animalList}) {

  const [animalIds, setAnimalIds] = useState([])

  const animalSelection = () => {
    const current_animals = animalList.map(a=> a.id)
    const animalSelection = animals.filter(a=> !current_animals.includes(a.id))
    return animalSelection
  }


  const handleSubmit = async (event) => {
    const id = zookeeper.id
    const name = zookeeper.name
    const animalID = animalIds[0]
    event.preventDefault()
    const body = JSON.stringify({
      zookeeper_id: id,
      note: `Added to ${name}'s takecare List.`,
      animal_id: animalID
    })
    const res = await fetch(`${process.env.REACT_APP_API_URL}/animal_logs`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    const newLog = await res.json()
    const newAnimal = newLog.animal
    addLog(newAnimal)    
  }


const handleCheckboxChange = (event) => {
    const animalId = parseInt(event.target.value);
    if (event.target.checked) {
      setAnimalIds(animalIds.concat(animalId))
     
    } else {
      setAnimalIds(animalIds.filter(id => id !== animalId))
    }
  }

  return (
       
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
       <h2 class="mr-28">Which Animal do you want to take care?</h2>
        <fieldset className="flex flex-grow mr-2 my-2">
          <label className="text-right w-28" htmlFor="animals">
          </label>
          <div className="grid sm:grid-cols-4 gap-4">
            {animalSelection().map(animal => (
              <label
                className={`text-sm p-2 ${animalIds.includes(animal.id)? '     bg-yellow-400' : ''}`}
                key={animal.id}
                htmlFor={`animal-${animal.id}`}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  title={animal.name}
                  className={'cursor-pointer object-cover h-36'}
                />{animal.name}
                <input
                  type="checkbox"
                  className="hidden"
                  id={`animal-${animal.id}`}
                  value={animal.id}
                  onChange={handleCheckboxChange}
                />
              </label>
            ))}
            
          </div>
        </fieldset>
        <span className="flex items-center mt-4">
           <button className="bg-gray-100 hover:bg-gray-300 px-4 py-2 mr-2 rounded-full" onClick={toggleShowNewAnimalListForm}>Cancel</button>
           <button className="flex bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-full" type="submit"><FaPaw size={20} /> Add Animal</button>
        </span>
    </form>

  )
}

export default NewAnimalListForm