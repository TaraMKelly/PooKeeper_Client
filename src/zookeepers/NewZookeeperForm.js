import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';

function NewZookeeperForm({ zookeepers, setZookeepers }) {
  const history = useHistory();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch(`${process.env.REACT_APP_API_URL}/zookeepers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name,
        image
      })
    });

    const parsedBody = await res.json();
    setZookeepers([...zookeepers, parsedBody]);
    history.push('/zookeepers');
  };

  return (
    <>
      <h1 className="text-3xl mb-3">New Pookeeper</h1>
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
          <label className="text-right w-28" htmlFor="image">
            Image Url
          </label>
          <input
            type="text"
            className="flex-grow border-b-2 ml-4 outline-none"
            name="image"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </fieldset>

        <button
          className="block relative py-3 px-5 bg-yellow-400 rounded-full text-2xl hover:bg-yellow-500  flex items-center text-center"
          type="submit"
        > 
          <FaPaw className='pr-1'/>
          Add Pookeeper
        </button>
      </form>
    </>
  );
}

export default NewZookeeperForm;
