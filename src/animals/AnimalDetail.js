import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import NewLogForm from './NewLogForm';
import { FaPencilAlt, FaTrash, FaWalking, FaPoop, FaPlus } from 'react-icons/fa';

function AnimalDetail({ animal = {}, animals, setAnimals }) {
  const { id, name, age, species, image_url } = animal;
  const history = useHistory()
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
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
      const res = await fetch(`${process.env.REACT_APP_API_URL}/animals/${id}`);
      const { dog_walks } = await res.json();

      setLogs(dog_walks);
    }
    fetchLogs();
  }, [id]);

  const handleDogDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/dogs/${id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' }
    });

    const parsedBody = await res.json();

    setAnimals(animals.filter((animal) => animal.id !== parsedBody.id));

  };

  const handlePooClick = async (logId) => {
    const log = logs.find(a => a.id === logId);
    togglePoo(log);
    
    const res = await fetch(`${process.env.REACT_APP_API_URL}/logs/${logId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({pooped: !log.pooped})
    });

    // if something is wrong with the response, display an error to our users.
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

  const handleDogWalkDelete = async (logId) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      console.log('put delete code here')
      setLogs(logs.filter(log => log.id !== logId));
      const res = await fetch(`${process.env.REACT_APP_API_URL}/logs/${logId}`, {
        method: 'DELETE'
      })
      // if something is wrong with the response then show an error message
      if (!res.ok) {
        setError('Something went wrong')
      }
    }
  }
 

  return (
    <div className="grid sm:grid-cols-3 gap-8">
      <div className="p-4 shadow text-center">
        <img className="object-cover w-full" src={image_url} alt={name} />
        <h1 className="text-2xl my-2">{name}</h1>
        <p>
          {species} - {age ? `${age} old` : 'age unknown'}
        </p>
        <div className="grid grid-cols-2 mt-4">
          <Link
            to={`/animals/${id}`}
            className="text-white bg-green-600 px-4 py-2 flex justify-center"
          >
            <FaWalking size={20} />
            Walks
          </Link>
          <div className="flex justify-end">
            <Link className="flex items-center mr-2" to={`/animals/${id}/edit`}>
              <FaPencilAlt size={20} />
            </Link>
            <a
              onClick={handleDogDelete}
              className="flex items-center mr-2"
              href={`/animals/${id}`}
            >
              <FaTrash size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="sm:col-span-2">
        <h1 className="text-2xl flex items-center">Walks {!showNewLogForm ? <FaPlus onClick={toggleShowNewLogForm} className="ml-2 cursor-pointer" /> : null}</h1>

        <ul className="space-y-4">
          {logs.map((log) => (
            <li key={log.id} className="flex items-bottom justify-between border-b-2 py-2">
              <span className="pb-1 pt-2 w-44">{log.formatted_time}</span>
              <span className="flex items-center">
                <button onClick={() => handlePooClick(log.id)}>
                  <FaPoop
                    style={{ color: log.pooped ? '#000' : '#bbb' }}
                    size={20}
                  />
                </button>
              </span>
              <span className="flex items-center">
                <button onClick={() => handleDogWalkDelete(log.id)}><FaTrash size={20} /></button>
              </span>
            </li>
          ))}
          {showNewLogForm && (
            <li key='theNewLogForm'>
              <NewLogForm
                animal={animal}
                toggleShowNewLogForm={toggleShowNewLogForm}
                addLog={addLog}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AnimalDetail;
