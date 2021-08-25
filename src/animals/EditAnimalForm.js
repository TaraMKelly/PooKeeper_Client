import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function EditAnimalForm({ animal = {}, onAnimalEdit }) {
  const history = useHistory();
  const [name, setName] = useState(animal.name);
  const [birthdate, setBirthdate] = useState(animal.birthdate);
  const [species, setSpecies] = useState(animal.species);
  const [sex, setSex] = useState(animal.sex);
  const [image, setImageUrl] = useState(animal.image);
  const {id} = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch(`http://localhost:9292/animals/${id}`, {
      method: 'PATCH',
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
    })
    .then((res) => res.json())
    .then((updatedAnimal) => onAnimalEdit(updatedAnimal))

    history.push('/animals');
  };

  useEffect(() => {
    setName(animal.name);
    setBirthdate(animal.birthdate);
    setSpecies(animal.species);
    setSex(animal.sex)
    setImageUrl(animal.image)
  }, [animal])


  return (
    <>
      <h1 className="text-3xl mb-3">Edit Animal: {animal.name}</h1>
      <form
        onSubmit={handleSubmit}
        className="text-2xl flex-col space-y-8 items-center"
      >
        <fieldset className="flex flex-grow mr-2 my-2">
          <label className="text-right w-28" htmlFor="name">
            Name:
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
          <label className="text-right w-28" htmlFor="sex">
            Sex:
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
          <label className="text-right w-28" htmlFor="birthdate">
            Birthdate:
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
            Species:
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
            Image Url:
          </label>
          <input
            type="text"
            className="flex-grow border-b-2 ml-4 outline-none"
            name="image"
            id="image"
            value={image}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </fieldset>

        <button
          className="block relative lg:-top-2 w-100 left-1 px-6 py-3 text-center bg-yellow-400 hover:bg-yellow-500 rounded-full"
          type="submit"
        >
          Update
        </button>
      </form>
    </>
  );
}

export default EditAnimalForm;
