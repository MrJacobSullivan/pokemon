import * as React from 'react';
import { trpc } from '@/utils/trpc';
import { getOptionsForVote } from '@/utils/getRandomPokemon';

const btn =
  'inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

export default function Home() {
  const [ids, updateIds] = React.useState(() => getOptionsForVote());
  const [firstId, secondId] = ids;

  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: firstId }]);
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: secondId }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return <div>Loading...</div>;
  }

  const castVote = (selected: number) => {
    // TODO: fire mutation to persist changes

    updateIds(() => getOptionsForVote());
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="p-2" />
      <div className="flex items-center justify-between max-w-2xl p-8 border rounded">
        <div className="flex flex-col items-center w-64 h-64">
          <img
            src={firstPokemon.data?.sprites.front_default}
            className="w-full"
          />
          <div className="-mt-6 text-xl text-center capitalize">
            {firstPokemon.data?.name}
          </div>
          <button className={btn} onClick={() => castVote(firstId)}>
            Vote
          </button>
        </div>
        <div className="p-8">VS</div>
        <div className="flex flex-col items-center w-64 h-64">
          <img
            src={secondPokemon.data?.sprites.front_default}
            className="w-full"
          />
          <div className="-mt-6 text-xl text-center capitalize">
            {secondPokemon.data?.name}
          </div>
          <button className={btn} onClick={() => castVote(secondId)}>
            Vote
          </button>
        </div>
        <div className="p-2" />
      </div>
    </div>
  );
}
