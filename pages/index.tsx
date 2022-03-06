import * as React from 'react';
import { trpc } from '@/utils/trpc';
import { getOptionsForVote } from '@/utils/getRandomPokemon';

export default function Home() {
  const [ids, updateIds] = React.useState(() => getOptionsForVote());
  const [firstId, secondId] = ids;

  const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: firstId }]);
  const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: secondId }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="p-2" />
      <div className="flex items-center justify-between max-w-2xl p-8 border rounded">
        <div className="flex flex-col w-64 h-64">
          <img
            src={firstPokemon.data?.sprites.front_default}
            className="w-full"
          />
          <div className="-mt-6 text-xl text-center capitalize">
            {firstPokemon.data?.name}
          </div>
        </div>
        <div className="p-8">VS</div>
        <div className="flex flex-col w-64 h-64 ">
          <img
            src={secondPokemon.data?.sprites.front_default}
            className="w-full"
          />
          <div className="-mt-6 text-xl text-center capitalize">
            {secondPokemon.data?.name}
          </div>
        </div>
        <div className="p-2" />
      </div>
    </div>
  );
}
