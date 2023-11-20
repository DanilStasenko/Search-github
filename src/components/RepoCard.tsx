import React, { useState } from 'react';
import { IRepo } from '../models/models';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';

export default function RepoCard({ repo }: { repo: IRepo }) {
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector((state) => state.github);

  const [isFavorite, setIsFavorite] = useState(favourites.includes(repo.html_url));

  function addToFavorite(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    addFavourite(repo.html_url);
    setIsFavorite(true);
  }
  function removeFromFavorite(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    removeFavourite(repo.html_url);
    setIsFavorite(false);
  }

  return (
    <div className="flex flex-col gap-2 border py-4 px-8 rounded cursor-pointer hover:shadow-md hover:bg-blue-500 hover:text-white transition-all overflow-hidden">
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <ul className="list-none text-sm flex flex-col gap-1">
          <li>
            Forks: <span className="text-bold">{repo.forks}</span>
          </li>
          <li>
            Watchers: <span className="text-bold">{repo.watchers}</span>
          </li>
        </ul>
        <p className="text-sm font-thin">{repo?.description}</p>

        {isFavorite ? (
          <button
            className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:shadow-md hover:bg-red-600 transition-all"
            onClick={removeFromFavorite}
          >
            Remove from favourites
          </button>
        ) : (
          <button
            className="mt-4 py-2 px-4 bg-yellow-500 text-white rounded hover:shadow-md hover:bg-yellow-600 transition-all"
            onClick={addToFavorite}
          >
            Add to favourites
          </button>
        )}
      </a>
    </div>
  );
}
