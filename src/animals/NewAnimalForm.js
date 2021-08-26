import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';

function NewAnimalForm({ animals, setAnimals }) {
  const history = useHistory();
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [species, setSpecies] = useState('');
  const [sex, setSex] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch(`${process.env.REACT_APP_API_URL}/animals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name,
        birthdate,
        species,
        sex,
        image
      })
    });

    const parsedBody = await res.json();
    setAnimals([...animals, parsedBody]);
    history.push('/animals');
  };

  return (
    <>
      <h1 className="text-3xl mb-3">New Animal</h1>
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
            type="text"
            className="flex-grow border-b-2 ml-4 outline-none"
            name="birthdate"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex flex-grow mr-2 my-2">
          <label className="text-right w-28" htmlFor="species">
            Species
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
          <label className="text-right w-28" htmlFor="sex">
            Sex
          </label>
          <input
            type="text"
            className="flex-grow border-b-2 ml-4 outline-none"
            name="sex"
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
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
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </fieldset>

        <button
          className="block relative py-3 px-5 bg-yellow-400 rounded-full text-2xl hover:bg-yellow-500  flex items-center text-center"
          type="submit"
        > 
          <FaPaw className='pr-1'/>
          Add Animal
        </button>
      </form>
    </>
  );
}

export default NewAnimalForm;
