import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { ReactComponent as EmptyIcon } from '../assets/images/empty.svg';
import { ReactComponent as DeleteIcon } from '../assets/images/delete.svg';
import { useActions } from '../hooks/actions';

export default function FavouritesPage() {
  const { favourites } = useAppSelector((state) => state.github);
  const { removeFavourite } = useActions();

  function removeFromFavorite(item: string) {
    removeFavourite(item);
  }

  if (favourites.length === 0)
    return (
      <section className="flex flex-col items-center">
        <p className="text-center py-10 text-4xl font-bold ">Empty</p>
        <EmptyIcon />
      </section>
    );

  return (
    <ul className="list-none flex flex-col items-center mt-10 gap-3 px-5 md:px-10 lg:px-40">
      {favourites.map((item) => (
        <li
          key={item}
          className="flex justify-between items-center border p-2 w-full border-blue-600 rounded hover:bg-blue-600 hover:text-white hover:shadow-md transition-all overflow-hidden cursor-pointer"
        >
          <a href={item} target="_blank" rel="noreferrer">
            {item}
          </a>

          <DeleteIcon className="rotate-on-hover" onClick={() => removeFromFavorite(item)} />
        </li>
      ))}
    </ul>
  );
}
