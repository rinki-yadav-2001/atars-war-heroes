
export const BASE_URL = 'https://swapi.dev/api';

export const fetchCharacters = async (page: number) => {
  const response = await fetch(`${BASE_URL}/people/?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};
