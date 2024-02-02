import {
    fetchCharacters,
    fetchHomePlanet,
    fetchHeroDetails,
    BASE_URL
  } from '../index'; 
  
  describe('API functions', () => {
    test('fetchCharacters should fetch characters data', async () => {
      const mockResponse = { results: [{
        name: 'Luke Skywalker',
        hair_color: 'blond',
        eye_color: 'blue',
        gender: 'male',
        homeworld: `${BASE_URL}/planets/1/`,
        films: [
          `${BASE_URL}/films/1/`,
          `${BASE_URL}/films/2/`,
        ],
      }] };
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);
  
      const charactersData = await fetchCharacters(1);
  
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/people/?page=1`);
      expect(charactersData).toEqual(mockResponse);
    });
  
    test('fetchHomePlanet should fetch home planet data', async () => {
      const mockResponse = { name: 'Tatooine' };
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);
  
      const homePlanetData = await fetchHomePlanet(`${BASE_URL}/planets/1/`);
  
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/planets/1/`);
      expect(homePlanetData).toEqual(mockResponse);
    });
  
    test('fetchHeroDetails should fetch hero details data', async () => {
        
      const mockResponse = { name: 'Luke Skywalker' };
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);
  
      const heroDetailsData = await fetchHeroDetails(1);
  
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/people/1`);
      expect(heroDetailsData).toEqual(mockResponse);
    });
  });
  