import React from 'react';
import NewZookeeperButton from './NewZookeeperButton';
import { BsGrid3X2GapFill } from 'react-icons/bs';
import { Link } from 'react-router-dom'

function ZookeepersToolBar() {


  return (
    <div className="grid grid-cols-2 py-1 border-b-2 mb-4">
      <div className="text-left">
        <Link to="/zookeepers" className="pr-2 py-2 flex items-center">
          <BsGrid3X2GapFill className="mr-2" size="20" />
           All Pookeepers
        </Link>
      </div>
      <div className="flex justify-end">
        <NewZookeeperButton />
      </div>
    </div>
  );
}

export default ZookeepersToolBar;