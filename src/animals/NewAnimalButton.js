import React from 'react'
import { FaDog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function NewAnimalButton() {
  return (
    <Link
      to="/animals/new"
      className="bg-green-600 text-white px-4 py-2 flex items-center w-32"
    >
      <FaDog className="inline-block mr-2 relative -top-0.5" size="20" color="grey-100" />
      New Animal
    </Link>
  );
}

export default NewAnimalButton
