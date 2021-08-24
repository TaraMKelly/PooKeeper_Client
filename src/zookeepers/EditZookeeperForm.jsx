import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function EditZookeeperForm({zookeepers, zookeeper = {}, setZookeepers}) {

    const [name , setName ] = useState(zookeeper.name)
    const [image, setImage] = useState(zookeeper.image)

useEffect(() => {

    setName(zookeeper.name);
    setImage(zookeeper.image);

},[zookeeper])

const {id} = useParams();

const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_API_URL}/zookeepers/${zookeeper.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name,
            image
          })
    })

    const parsedBody = await res.json();
    setZookeepers(zookeepers.map(zookeeper => zookeeper.id === parseInt(id) ? parsedBody : zookeeper))

    
}

return <> 
<h1 className="text-3xl mt-3 mb-3">Edit  {zookeeper.name}</h1>

<form
    onSubmit={handleSubmit}
    className="text-2xl flex-col space-y-8 items-center p-4 mt-6"
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
          className="block relative lg:-top-2 w-100 left-1 px-4 py-2 text-center bg-green-600 text-white"
          type="submit"
        >
          Update
        </button>


</form>


</>


}

export default EditZookeeperForm