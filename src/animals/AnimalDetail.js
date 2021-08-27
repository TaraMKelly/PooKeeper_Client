import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import NewLogForm from './NewLogForm';
import { FaPencilAlt, FaTrash, FaHamburger, FaPaw, FaPoop, FaPlus } from 'react-icons/fa';

function AnimalDetail({ animal = {}, animals, setAnimals }) {
  const { id, name, birthdate, species, sex, image } = animal;
  const history = useHistory()
  const [logs, setLogs] = useState([]);

  const [showNewLogForm, setShowNewLogForm] = useState(false);
 

  const toggleShowNewLogForm = () => {
    setShowNewLogForm(!showNewLogForm)
  }

  const addLog = (log) => {
    setLogs([...logs, log])
    toggleShowNewLogForm()
  }


  useEffect(() => {
    async function fetchLogs() {
      if (!id) return;
      const res = await fetch(`${process.env.REACT_APP_API_URL}/animal_logs/animal/${id}`);
      setLogs(await res.json());
    }
    fetchLogs();
  }, [id]);

  const handleAnimalDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this animal?")) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/animals/${id}`, {
      method: 'DELETE',
    });
    const parsedBody = await res.json();
    setAnimals(animals.filter((animal) => animal.id !== parsedBody.id));
    history.push('/animals')
    }
  };

  const handlePooClick = async (logId) => {
    const log = logs.find(a => a.id === logId);
    togglePoo(log);
    
    await fetch(`${process.env.REACT_APP_API_URL}/animal_logs/${logId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({pooped: !log.pooped})
    });
  };

  const handleFedClick = async (logId) => {
    const log = logs.find(a => a.id === logId);
    toggleFed(log);
    
    await fetch(`${process.env.REACT_APP_API_URL}/animal_logs/${logId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({fed: !log.fed})
    });
  }

  const toggleFed = (log) => {
    const updatedLogs = logs.map((a) => {
      if (a.id === parseInt(log.id)) {
        return { ...a, fed: !log.fed };
      } else {
        return a;
      }
    });
    setLogs(updatedLogs);
  };

  const togglePoo = (log) => {
    const updatedLogs = logs.map((a) => {
      if (a.id === parseInt(log.id)) {
        return { ...a, pooped: !log.pooped };
      } else {
        return a;
      }
    });
    setLogs(updatedLogs);
  };


  const handleAnimalLogDelete = async (logId) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      console.log('put delete code here')
      setLogs(logs.filter(log => log.id !== logId));
      await fetch(`${process.env.REACT_APP_API_URL}/animal_logs/${logId}`, {
        method: 'DELETE'
      })
      // if something is wrong with the response then show an error message
      // if (!res.ok) {
      //   setError('Something went wrong')
      // } 
    }
  }
 

  return (
    <div className="grid sm:grid-cols-3 gap-8">
      <div className="p-4 shadow text-center">
        <img className="object-cover w-full" src={image} alt={name} />
        <h1 className="text-2xl my-2">{name}</h1>
        <p>Sex: {sex}</p>
        <p>Species: {species}</p>
        <p>
         {birthdate ? `DOB: ${birthdate}` : 'DOB unknown'}
        </p>
        <div className="grid grid-cols-2 mt-4">
          <Link
            to={`/animals/${id}`}
            className="bg-yellow-400 hover:bg-yellow-500 rounded-full px-4 py-2 flex justify-center"
          >
            <FaPaw size={20} />
            Create Logs
          </Link>
          <div className="flex justify-end">
            <Link className="flex items-center mr-2" to={`/animals/${id}/edit`}>
              <FaPencilAlt size={20} />
            </Link>
            <a
              onClick={()=>handleAnimalDelete(id)}
              className="flex items-center mr-2"
              href={`/animals/${id}`}
            >
              <FaTrash size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className='mb-6 mt-6 py-2 px-5 pl-20 bg-yellow-400 rounded-full text-2xl hover:bg-yellow-500 items-center text-center'>
          <h1 className="text-2xl flex items-center">Add Logs {!showNewLogForm ? <FaPlus onClick={toggleShowNewLogForm} className="ml-2 cursor-pointer" /> : null}</h1>
        </div>

        <ul className="space-y-4">
          {showNewLogForm && (
              <li key='theNewLogForm'>
                <NewLogForm
                  animal={animal}
                  toggleShowNewLogForm={toggleShowNewLogForm}
                  addLog={addLog}
                />
              </li>
            )}
          {logs.map((log) => (
            
            <li key={log.id} className="flex items-bottom justify-between border-b-2 py-2">
              <span className="pb-1 pt-2 w-44 text-left md:text-center ">{log.formatted_time}</span>
              <span className="flex items-center">
                 <button onClick={() => handleFedClick(log.id)}>
                 <FaHamburger className="ml-8 mr-4"
                    style={{ color: log.fed ? '#000' : '#bbb' }} size={20}
                 />
                 </button>
                <button onClick={() => handlePooClick(log.id)}>
                  <FaPoop className="ml-4 mr-8"
                    style={{ color: log.pooped ? '#000' : '#bbb' }}
                    size={20}
                  />
                </button>
                <div>
                    <p>{log.note}</p>
                </div>
              </span>
              <span className="flex items-center">
                <button onClick={() => handleAnimalLogDelete(log.id)}><FaTrash className="ml-6 mr-6" size={20} /></button>
              </span>
            </li>
          ))}
          
        </ul>
      </div>
    </div>
  );
}

export default AnimalDetail;
