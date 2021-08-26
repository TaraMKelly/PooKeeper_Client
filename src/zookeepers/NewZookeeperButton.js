import React from 'react'
import { FaPoo } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// className="bg-green-600 text-white px-4 py-2 flex items-center w-32"
function NewZookeeperButton() {
  return (
    <Link
      to="/zookeepers/new"
      className='py-3 px-5 rounded-full bg-yellow-400 text-2xl hover:bg-yellow-500  flex items-center text-center'
    >
      <FaPoo className="inline-block mr-2 relative -top-0.5" size="20" color="grey-100" />
      New Pookeeper
    </Link>
  );
}

export default NewZookeeperButton