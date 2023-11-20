import React, { useEffect, useState } from 'react';
import { useLazyGetUserRepositoriesQuery, useSearchUsersQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';
import RepoCard from '../components/RepoCard';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);

  const {
    data: users,
    isError,
    isLoading,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 2,
    refetchOnFocus: true,
  });
  const [fetchRepos, { data: repos, isError: areReposError, isLoading: areReposLoading }] =
    useLazyGetUserRepositoriesQuery();

  useEffect(() => {
    setDropdown(debounced.length > 2 && users?.length! > 0);
  }, [debounced, users]);

  function clickHandlerUser(username: string) {
    fetchRepos(username);
    setDropdown(false);
  }
  console.log(users);

  return (
    <section className="flex justify-center pt-20">
      {isError ? (
        <p className="text-center text-red-800">
          Something went wrong. Since the API is free, the limit has been exceeded.
        </p>
      ) : (
        <div className="relative w-full px-5 md:px-10 lg:px-20 xl:px-40">
          <div className="relative">
            <input
              type="text"
              className="border py-3 px-6 w-full h-[64px]"
              placeholder="Search for Github username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {dropdown && (
              <ul className="list-none absolute top-[64px] left-0 right-0 max-h-[200px] shadow-md bg-white w-full overflow-y-auto">
                {isLoading && <li className="px-6 py-3">Loading...</li>}
                {users?.map((user) => (
                  <li
                    key={user.id}
                    onClick={() => clickHandlerUser(user.login)}
                    className="px-6 py-3 hover:bg-blue-700 hover:text-white transition-colors cursor-pointer"
                  >
                    {user.login}
                  </li>
                ))}
              </ul>
            )}
            <div>
              {areReposLoading && <p>Loading repositories...</p>}
              {areReposError && <p>Something went wrong...</p>}
              {repos?.map((repo) => (
                <RepoCard repo={repo} key={repo.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
