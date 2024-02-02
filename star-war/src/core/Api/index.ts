
export const BASE_URL = 'https://swapi.dev/api';

export const fetchCharacters = async (page: number) => {
  const response = await fetch(`${BASE_URL}/people/?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};

export const fetchHomePlanet = async (planetUrl?: string) => {
  const response = await fetch(`${planetUrl}`);
  // console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch  home planet of heroes');
  }
  return response.json();
};


export const fetchHeroDetails = async (id?: number | string ) => {
  const response = await fetch(`${BASE_URL}/people/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch single heros  details');
  }
  return response.json();
};