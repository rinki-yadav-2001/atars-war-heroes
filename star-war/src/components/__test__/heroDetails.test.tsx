
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HeroDetails from '../HeroDetails';
import { BASE_URL, fetchHeroDetails, fetchHomePlanet } from '../../core/Api';


jest.mock('../../core/Api', () => {
  const originalModule = jest.requireActual('../../core/Api');
  return {
    ...originalModule,
    fetchHeroDetails: jest.fn(),
    fetchHomePlanet: jest.fn(),
  };
});



describe('HeroDetails Component', () => {
  test.skip('renders hero details after successful data fetching', async () => {

    const mockResponse = {
      name: 'Luke Skywalker',
      hair_color: 'blond',
      eye_color: 'blue',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
      ],
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const heroDetailsData = await fetchHeroDetails(1);
    const planetResponce = { name: 'Tatooine' };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => planetResponce,
    } as Response);

    const homePlanetData = await fetchHomePlanet(`${BASE_URL}/planets/1/`);

    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/planets/1/`);
    expect(homePlanetData).toEqual(planetResponce)

    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/1');
    expect(heroDetailsData).toEqual(mockResponse);
    (fetchHeroDetails as jest.Mock).mockResolvedValueOnce({});
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<HeroDetails />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(async() => {
      await expect(fetchHeroDetails).toHaveBeenCalledTimes(1);
    });
  });

  test('renders loading message while data is being fetched', async () => {
    const heroData = {
      name: 'Luke Skywalker',
      hair_color: 'blond',
      eye_color: 'blue',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
      ],
    };

    const homePlanetData = {
      name: 'Tatooine',
    };
    (fetchHeroDetails as jest.Mock).mockResolvedValueOnce(heroData);
     (fetchHomePlanet as jest.Mock).mockResolvedValueOnce(homePlanetData);

  
      render(
        <MemoryRouter initialEntries={['/character/1']}>
          <Routes>
            <Route path="/character/:id" element={<HeroDetails />} />
          </Routes>
        </MemoryRouter>,
      )


    

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(async () => {
     expect(fetchHeroDetails).toHaveBeenCalledTimes(1);
     
    });

  });

  });
