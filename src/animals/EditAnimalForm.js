import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function EditAnimalForm({ animals, animal = {}, setAnimals }) {
  const history = useHistory();
  const [name, setName] = useState(animal.name);
  const [birthdate, setBirthdate] = useState(animal.birthdate);
  const [species, setSpecies] = useState(animal.species);
  const [image_url, setImageUrl] = useState(
    animal.image_url
  );
  const {id} = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    history.push('/animals');
  };

  return (
    <>
      <h1 className="text-3xl mb-3">Edit Animal: {animal.name}</h1>
      <form
        onSubmit={handleSubmit}
        className="text-2xl flex-col space-y-8 items-center"
      >
        <fieldset className="flex flex-grow mr-2 my-2">
          <label className="text-right w-28" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="flex-grow border-b-2 ml-4 outline-none"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex flex-grow mr-2 my-2">
          <label className="text-right w-28" htmlFor="birthdate">
            Birthdate
          </label>
          <input
            type="date"
            className="flex-grow border-b-2 ml-4 outline-none"
            name="birthdate"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex flex-grow mr-2 my-2">
          <label className="text-right w-28" htmlFor="species">
            species
          </label>
          <input
            type="text"
            className="flex-grow border-b-2 ml-4 outline-none"
            name="species"
            id="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex flex-grow mr-2 my-2">
          <label className="text-right w-28" htmlFor="image_url">
            Image Url
          </label>
          <input
            type="text"
            className="flex-grow border-b-2 ml-4 outline-none"
            name="image_url"
            id="image_url"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </fieldset>

        <button
          className="block relative lg:-top-2 w-100 left-1 px-4 py-2 text-center bg-green-600 text-white"
          type="submit"
        >
          Update
        </button>
      </form>
    </>
  );
}

export default EditAnimalForm;
