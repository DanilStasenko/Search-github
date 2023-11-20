import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

export default function Navigation() {
  const { favourites } = useAppSelector((state) => state.github);

  return (
    <nav className="flex justify-between items-center py-10 px-5 lg:px-20 xl:px-40 shadow-md bg-blue-600 text-white text-2xl">
      <h1 className="font-bold">Github Search</h1>
      <ul className="flex flex-col justify-between gap-x-5 gap-y-2 md:flex-row ">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="relative">
          <Link to="/favourites">Favorites</Link>
          <span className="block absolute top-0 right-[-30px] text-sm text-center font-bold border rounded-full w-[25px] h-[25px] bg-white text-yellow-600">
            {favourites.length}
          </span>
        </li>
      </ul>
    </nav>
  );
}
