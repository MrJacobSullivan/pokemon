import { PokemonClient } from 'pokenode-ts';
import { prisma } from '../backend/utils/prisma';

const doBackfill = async () => {
  const pokeApiConnection = new PokemonClient();

  const allPokemon = await pokeApiConnection.listPokemons(0, 493);

  const formattedPokemon = allPokemon.results.map((pokemon, index) => {
    const id = index + 1;
    const name = (pokemon as { name: string }).name;
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return { id, name, spriteUrl };
  });

  const creation = await prisma.pokemon.createMany({
    data: formattedPokemon,
  });

  console.log('Creation?', creation);
};

doBackfill();
