import React from 'react';
import AnimalListItem from './AnimalListItem';

function AnimalsList({ animals, setAnimals }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {animals.map((animal) => (
        <AnimalListItem key={animal.id} animal={animal} animals={animals} setAnimals={setAnimals} />
      ))}
    </div>
  );
}

export default AnimalsList;