import * as React from 'react';
import { trpc } from '@/utils/trpc';
import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { inferQueryResponse } from './api/trpc/[trpc]';

const btn =
  'inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

type PokemonFromServer = inferQueryResponse<'get-pokemon-by-id'>;

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = ({ pokemon, vote }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={pokemon.sprites.front_default || ''} className="w-64 h-64" />
      <div className="-mt-6 text-xl text-center capitalize">{pokemon.name}</div>
      <button className={btn} onClick={vote}>
        Vote
      </button>
    </div>
  );
};

const Home = () => {
  const [ids, updateIds] = React.useState(() => getOptionsForVote());
  const [firstId, secondId] = ids;

  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: firstId }]);
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: secondId }]);

  const voteMutation = trpc.useMutation(['cast-vote']);

  const castVote = (selected: number) => {
    if (selected === firstId) {
      voteMutation.mutate({ votedFor: firstId, votedAgainst: secondId });
    } else {
      voteMutation.mutate({ votedFor: secondId, votedAgainst: firstId });
    }

    updateIds(() => getOptionsForVote());
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="p-2" />
      <div className="flex items-center justify-between max-w-2xl p-8 border rounded">
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <>
              <PokemonListing
                pokemon={firstPokemon.data}
                vote={() => castVote(firstId)}
              />
              <div className="p-8">VS</div>
              <PokemonListing
                pokemon={secondPokemon.data}
                vote={() => castVote(secondId)}
              />
            </>
          )}
        <div className="p-2" />
      </div>
    </div>
  );
};

export default Home;
