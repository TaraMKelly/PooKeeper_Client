import React, { useState, useEffect } from 'react';
import ZookeeperAnimalList from './ZookeeperAnimalList'
import NewAnimalListForm from './NewAnimalListForm'
import { Link, useHistory } from 'react-router-dom';
import { FaPencilAlt, FaTrash, FaHamburger, FaPaw, FaPoop, FaPlus } from 'react-icons/fa';

function ZookeeperDetail({ zookeeper = {}, zookeepers, setZookeepers }) {
  const { id, name, image } = zookeeper;
  const history = useHistory()
  const [animalList, setAnimalList] = useState([]);
  const [ animals, setAnimals ] = useState([]);
  const [error, setError] = useState(null);
  const [showNewAnimalListForm, setShowNewAnimalListForm] = useState(false);
 

  const toggleShowNewAnimalListForm = () => {
    setShowNewAnimalListForm(!showNewAnimalListForm)
  }

  const addLog = (log) => {
    setAnimalList([...animalList, log])
    toggleShowNewAnimalListForm()
  }
  

  useEffect(() => {
     fetch(`${process.env.REACT_APP_API_URL}/animals`)
      .then(res => res.json())
      .then(setAnimals)
  }, []);

  useEffect(() => {
    async function fetchLogs() {
      if (!id) return;
      const res = await fetch(`${process.env.REACT_APP_API_URL}/zookeepers/${id}`);
      
      const animals = await res.json();
      setAnimalList(animals);
    }
    fetchLogs();
  }, [id]);
 
//   const filteredAnimal = () => {
//     console.log(animals.map((animal => animal.id.includes(animalList.id))))
   
//   }  
//   const handleDogDelete = async (e) => {
//     e.preventDefault();
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/animals/${id}`, {
//       method: 'DELETE',
//       headers: { Accept: 'application/json' }
//     });

//     const parsedBody = await res.json();

//     setAnimals(animals.filter((animal) => animal.id !== parsedBody.id));

//   };

//   const handlePooClick = async (logId) => {
//     const log = logs.find(a => a.id === logId);
//     togglePoo(log);
    
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/animal_logs/${logId}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({pooped: !log.pooped})
//     });

//     // if something is wrong with the response, display an error to our users.
//   };

//   const handleFedClick = async (logId) => {
//     const log = logs.find(a => a.id === logId);
//     toggleFed(log);
    
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/animal_logs/${logId}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({fed: !log.fed})
//     });
//   }

//   const toggleFed = (log) => {
//     const updatedLogs = logs.map((a) => {
//       if (a.id === parseInt(log.id)) {
//         return { ...a, fed: !log.fed };
//       } else {
//         return a;
//       }
//     });
//     setLogs(updatedLogs);
//   };

//   const togglePoo = (log) => {
//     const updatedLogs = logs.map((a) => {
//       if (a.id === parseInt(log.id)) {
//         return { ...a, pooped: !log.pooped };
//       } else {
//         return a;
//       }
//     });
//     setLogs(updatedLogs);
//   };


//   const handleDogWalkDelete = async (logId) => {
//     if (window.confirm("Are you sure you want to delete this log?")) {
//       console.log('put delete code here')
//       setLogs(logs.filter(log => log.id !== logId));
//       const res = await fetch(`${process.env.REACT_APP_API_URL}/animal_logs/${logId}`, {
//         method: 'DELETE'
//       })
//       // if something is wrong with the response then show an error message
//       if (!res.ok) {
//         setError('Something went wrong')
//       }
//     }
//   }
//   console.log(logs)

  return (
    
    <div className="grid sm:grid-cols-3 gap-8">
      <div className="p-4 shadow text-center">
        <img className="object-cover w-full" src={image} alt={name} />
        <h1 className="text-2xl my-2">{name}</h1>
        <div className="grid grid-cols-2 mt-4">
          <Link
            to={`/zookeepers/${id}`}
            className="bg-yellow-400 hover:bg-yellow-500 rounded-full px-4 py-2 flex justify-center"
          >
            <FaPaw size={20} />
            Manage Animals
          </Link>
          <div className="flex justify-end">
            <Link className="flex items-center mr-2" to={`/animals/${id}/edit`}>
              <FaPencilAlt size={20} />
            </Link>
            <a
              onClick={""}
              className="flex items-center mr-2"
              href={`/zookeepers/${id}`}
            >
              <FaTrash size={20} />
            </a>
          </div>
        </div>
      </div>
        {/* <div >
        <input className='rounded-full py-3 mb-4 mt-4 mr-4 px-5 bg-yellow-400 text-2xl flex-center items-center' onChange={handleSearch} name="name" type="text" placeholder="Search by..."></input>
        </div> */}
        {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"> */}
        <div className="sm:col-span-2">
        <div className='mb-6 mt-6 py-2 px-5 pl-20 bg-yellow-400 rounded-full text-2xl hover:bg-yellow-500 items-center text-center'>
          <h1 className="text-2xl flex items-center">Add Animal {!showNewAnimalListForm ? <FaPlus onClick={toggleShowNewAnimalListForm} className="ml-2 cursor-pointer" /> : null}</h1>
        </div>

        <ul className="space-y-4">
          {showNewAnimalListForm && (
              <li key='theNewAnimalListForm'>
                <NewAnimalListForm
                  zookeeper={zookeeper}
                  toggleShowNewAnimalListForm={toggleShowNewAnimalListForm}
                  addLog={addLog}
                />
              </li>
            )}

          {animalList.map((animal) => (
            <ZookeeperAnimalList key={animal.id} animal={animal} 
            // onAnimalDelete={onAnimalDelete} 
            />
          ))}
        {/* </div> */}
        </ul>
        </div>
    </div>
  );
}

export default ZookeeperDetail;
