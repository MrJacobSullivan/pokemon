const MAX_DEX_ID = 493;

export const getRandomPokemon = (excluding?: number): number => {
  const pokedexNumber = Math.floor(Math.random() * (MAX_DEX_ID - 1) + 1);

  return pokedexNumber !== excluding
    ? pokedexNumber
    : getRandomPokemon(excluding);
};

export const getOptionsForVote = () => {
  const firstId = getRandomPokemon();
  const secondId = getRandomPokemon(firstId);
  return [firstId, secondId];
};
