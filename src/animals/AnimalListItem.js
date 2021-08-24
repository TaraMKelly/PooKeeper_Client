import React from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaTrash, FaWalking, FaStickerMule, FaPaw, FaPoo } from 'react-icons/fa';


function AnimalListItem({animal: { id, name, age, species, image }, onAnimalDelete}) {
  
  const handleDelete = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:9292/animals/${id}`, {
      method: "DELETE",
    });
    onAnimalDelete(id);  
  };

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
          {species} - {age ? `${age} old` : 'age unknown'}
        </p>
      </figure>
      <div className="grid grid-cols-2 mt-4">
        <Link
          to={`/animals/${id}`}
          className="text-white bg-green-600 px-4 py-2 flex justify-center"
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
    </div>
  );
}

export default AnimalListItem;
