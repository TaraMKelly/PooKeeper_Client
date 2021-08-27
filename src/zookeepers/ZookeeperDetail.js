import React, { useState, useEffect } from 'react';
import ZookeeperAnimalList from './ZookeeperAnimalList'
import NewAnimalListForm from './NewAnimalListForm'
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaPaw, FaPlus } from 'react-icons/fa';

function ZookeeperDetail({ zookeeper = {} }) {
  const { id, name, image } = zookeeper;
  const [animalList, setAnimalList] = useState([]);
  const [ animals, setAnimals ] = useState([]);
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

    
    // const handleDelete = (e) => {
    //   e.preventDefault();
    //   if (window.confirm("Are you sure you want to delete this zookeeper?")) {
    //   fetch(`${process.env.REACT_APP_API_URL}/zookeepers/${id}`, 
    //   {method: 'DELETE'})
    //   .then(res => res.text())
    //   .then(res => console.log(res))
    
    //   const updatedKeepers = zookeepers.filter( keeper => keeper.id !== id)
    //   setZookeepers(updatedKeepers)
    
    //   history.push('/zookeepers')
    //   }
    // };

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
            <Link className="flex items-center mr-2" to={`/zookeepers/${id}/edit`}>
              <FaPencilAlt size={20} />
            </Link>
            {/* <a
              onClick={handleDelete}
              className="flex items-center mr-2"
              href={`/zookeepers/${id}`}
            >
              <FaTrash size={20} />
            </a> */}
          </div>
        </div>
      </div>
     
        {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"> */}
        <div className="sm:col-span-2">
        <div className='mb-6 mt-6 py-2 px-5 pl-20 bg-yellow-400 rounded-full text-2xl hover:bg-yellow-500 items-center text-center'>
          <h1 className="text-2xl flex items-center">Add Animal to CareList{!showNewAnimalListForm ? <FaPlus onClick={toggleShowNewAnimalListForm} className="ml-2 cursor-pointer" /> : null}</h1>
        </div>

        <ul className="space-y-4">
          {showNewAnimalListForm && (
              <li key='theNewAnimalListForm'>
                <NewAnimalListForm
                  zookeeper={zookeeper}
                  toggleShowNewAnimalListForm={toggleShowNewAnimalListForm}
                  animals={animals}
                  animalList={animalList}
                  setAnimalList={setAnimalList}
                  addLog={addLog}
                />
              </li>
            )}

          {animalList.map((animal) => (
            <ZookeeperAnimalList key={animal.id} animal={animal} zookeeper={zookeeper}  animalList={animalList}
            setAnimalList={setAnimalList}
            addLog={addLog}
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
