
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CharactersProvider, useCharactersState } from '../../core/context/characterListContext';
import CharacterList from '../CharacterList';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../core/context/characterListContext', () => {
  const originalModule = jest.requireActual('../../core/context/characterListContext');
  return {
    ...originalModule,
    useCharactersState: jest.fn(),
  };
});

describe('CharacterList Component', () => {
  beforeEach(() => {
    (useCharactersState as jest.Mock).mockReturnValue({
      characters: [
        { name: 'Luke Skywalker', gender: 'Male', homeworldName: 'Tatooine' },
        { name: 'Leia Organa', gender: 'Female', homeworldName: 'Alderaan' },
      ],
      isLoading: false,
      error: null,
    });
  });

  test('renders correctly', () => {
    render(
        <BrowserRouter>
        <CharactersProvider>
          <CharacterList />
        </CharactersProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  test('displays loading message when loading', () => {
 
    (useCharactersState as jest.Mock).mockReturnValue({
      characters: [],
      isLoading: true,
      error: null,
    });

    render(
      <CharactersProvider>
        <CharacterList />
      </CharactersProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {

    (useCharactersState as jest.Mock).mockReturnValue({
      characters: [],
      isLoading: false,
      error: 'Some error message',
    });

    render(
      <CharactersProvider>
        <CharacterList />
      </CharactersProvider>
    );

    expect(screen.getByText('Error: Some error message')).toBeInTheDocument();
  });
});
