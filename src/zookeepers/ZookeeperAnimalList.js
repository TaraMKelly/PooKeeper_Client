import React from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaTrash, FaPaw } from 'react-icons/fa';


function ZookeeperAnimalList({animal: { id, name, sex, birthdate, age, species, image }, onAnimalDelete, zookeeper, animalList, setAnimalList, addLog}) {
  
  const handleDelete = async (e) => {
    if (window.confirm("Are you sure you want to remove this animal?")) {
    e.preventDefault();
    fetch(`http://localhost:9292/animals/${id}`, {
      method: "DELETE",
    });
    setAnimalList(animalList.filter(animal => animal.id !== id))
    // onAnimalDelete(id);  
    }
  };

  const handleDeleteFromList = (id) => {
    if (window.confirm("Are you sure you want to remove this animal?")) {
     fetch(`http://localhost:9292/zookeepers/${zookeeper.id}/${id}`, {
       method: "DELETE",
     })

     setAnimalList(animalList.filter(animal => animal.id !== id))
    }

   
  //   await fetch(`${process.env.REACT_APP_API_URL}/animal_logs/${zookeeper.id}`, {
  //     method: 'PATCH',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json'
  //       },
  //       body: JSON.stringify({
  //         name,
  //         image
  //       })
  // })
  }

  return (
    <div className="p-4 shadow text-center flex flex-col justify-between" key={ id }>
      <figure>
        <img
          className="object-cover sm:h-96 xl:h-112 w-full"
          src={image}
          alt={name}
        />
        <h1 className="text-2xl my-2">{name}</h1>
        <p>
          {species} - {sex} - DOB : {birthdate} 
        </p>
      </figure>
      <div className="grid grid-cols-2 mt-4">
        <Link
          to={`/animals/${id}`}
          className="bg-yellow-400 rounded-full hover:bg-yellow-500 px-4 py-2 flex justify-center"
        >
          <FaPaw size={20} />
            Create Log
        </Link>
        <div className="flex justify-end">
          <Link className="flex items-center mr-2" to={`/animals/${id}/edit`}>
            <FaPencilAlt size={20} />
          </Link>
          <a
            onClick={handleDelete}
            className="flex items-center mr-2"
            href={`/animals/${id}`}
          >
            <FaTrash size={20} />
          </a>
        </div>
      </div>
      <div
          onClick={()=>handleDeleteFromList(id)}
          className="mt-4 bg-yellow-400 cursor-pointer rounded-full hover:bg-yellow-500 px-4 py-2 flex justify-center"
        >
          <FaPaw size={20} />
            Remove Animal from CareList
        </div>
    </div>
  );
}

export default ZookeeperAnimalList;
