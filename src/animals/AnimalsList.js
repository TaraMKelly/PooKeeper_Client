import React from 'react';
import AnimalListItem from './AnimalListItem';

function AnimalsList({ animals, onAnimalDelete, sendSearchWord }) {

  const handleSearch = (e) => {
    sendSearchWord(e.target.value)   
  }
  return (
    <>
      <div >
      <input className='rounded-full py-3 mb-4 mt-4 mr-4 px-5 bg-yellow-400 text-2xl flex-center items-center' onChange={handleSearch} name="name" type="text" placeholder="Search by..."></input>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {animals.map((animal) => (
          <AnimalListItem key={animal.id} animal={animal} onAnimalDelete={onAnimalDelete} />
        ))}
      </div>
    </>
  );
}

export default AnimalsList;
