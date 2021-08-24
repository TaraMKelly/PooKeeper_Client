import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function EditAnimalForm({ animals, animal = {}, setAnimals, onAnimalEdit }) {
  const history = useHistory();
  const [name, setName] = useState(animal.name);
  const [birthdate, setBirthdate] = useState(animal.birthdate);
  const [species, setSpecies] = useState(animal.species);
  const [sex, setSex] = useState(animal.sex);
  const [image, setImageUrl] = useState(animal.image);
  const {id} = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await 

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
  

    // const parsedBody = await res.json();
    // setAnimals(animals.map(animal => animal.id === parseInt(id) ? parsedBody : animal));

    // history.push('/animals');
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
