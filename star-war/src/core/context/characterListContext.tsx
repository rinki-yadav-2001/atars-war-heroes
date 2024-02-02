import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchCharacters, fetchHomePlanet } from '../Api';
import charactersReducer from '../reducer/characterListReducer';
import { CharactersProviderProps, CharactersStateList,Character } from '../../types';

const initialState: CharactersStateList = {
  characters: [],
  isLoading: false,
  error: null,
};

const CharactersStateContext = createContext<CharactersStateList | undefined>(undefined);
export const CharactersProvider: React.FC<CharactersProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(charactersReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'LOADING_CHARACTER' });
      try {
        const charactersData = await fetchCharacters(1);

        const charactersWithHomeWorld = await Promise.all(
          charactersData.results.map(async (character: Character) => {
            const homeWorldData = await fetchHomePlanet(character.homeworld);
            return { ...character,  homeworldName: homeWorldData?.name };
          })
        );

        dispatch({ type: 'FETCH_CHARACTERS_LIST', payload: charactersWithHomeWorld });
        console.log(charactersWithHomeWorld);
      } catch (error: any) {
        dispatch({ type: 'CHARACTERLIST_ERROR', payload: error.message });
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <CharactersStateContext.Provider value={state}>
    
        {children}
    
    </CharactersStateContext.Provider>
  );
};

export const useCharactersState = () => {
  const context = useContext(CharactersStateContext);
  if (context === undefined) {
    throw new Error('useCharactersState must be used within a CharactersProvider');
  }
  return context;
};


