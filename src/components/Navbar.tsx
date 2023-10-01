import React from 'react';
import { Link } from "react-router-dom";

const routes = [
    { path: '/', label: 'Home' },
    { path: '/AddData', label: 'Add Data' },
    { path: '/GetData', label: 'Get Data' },
    { path: '/UpdateData', label: 'Update Data' },
    { path: '/DeleteData', label: 'Delete Data' },
  ];

function Navbar() {
  return (
    <nav className="bg-indigo-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">Seku Corp.</div>
          <ul className="flex space-x-4">
            {routes.map((route, index)=>(
                <li className="text-white hover:text-gray-300 hover:cursor-pointer" key={index}>
                    <Link to={route.path}>{route.label}</Link>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
