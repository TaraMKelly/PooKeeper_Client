import React from 'react';
import { NavLink } from 'react-router-dom';
// import Container from '../shared/Container';

function Navbar() {
  return (
    <div className="bg-yellow-200">
      <nav className="w-4/5 mx-auto">
        <NavLink className="hover:underline inline-block p-4 -ml-4 list" exact to="/">HomePage</NavLink>
        <NavLink className="hover:underline inline-block p-4 -ml-4 list" to="/animals">Animals</NavLink>
        {/* <NavLink className="inline-block p-4 list" to="/logs">Logs</NavLink> */}
        <NavLink className="hover:underline inline-block p-4 -ml-4 list" to="/zookeepers">PooKeepers</NavLink>
       
      </nav>
    </div>
  );
}

export default Navbar;
