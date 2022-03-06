import * as React from 'react';
import { trpc } from '@/utils/trpc';
import { getOptionsForVote } from '@/utils/getRandomPokemon';

export default function Home() {
  const [first, second] = getOptionsForVote();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="p-2" />
      <div className="flex items-center justify-between max-w-2xl p-8 border rounded">
        <div className="w-16 h-16 bg-red-800">{first}</div>
        <div className="p-8">VS</div>
        <div className="w-16 h-16 bg-green-800">{second}</div>
      </div>
    </div>
  );
}
