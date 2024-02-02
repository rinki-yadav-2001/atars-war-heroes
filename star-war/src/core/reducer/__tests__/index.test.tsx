
import { renderHook, act } from '@testing-library/react';
import { useReducer } from 'react';
import charactersReducer from '../characterListReducer'
import { CharactersStateList } from '../../../types';

describe('charactersReducer', () => {
  it('handles LOADING_CHARACTER action', () => {
    const { result } = renderHook(() => useReducer(charactersReducer, {} as CharactersStateList));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: 'LOADING_CHARACTER' });
    });

    expect(result.current[0].isLoading).toBe(true);
    expect(result.current[0].error).toBeNull();
  });

  it('handles FETCH_CHARACTERS_LIST action', () => {
    const { result } = renderHook(() => useReducer(charactersReducer, {} as CharactersStateList));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: 'FETCH_CHARACTERS_LIST', payload: [{ name: 'Luke', gender: "male", homeworld:'planet' , homeworldName: 'sun' }] });
    });

    expect(result.current[0].characters).toEqual([{ name: 'Luke', gender: "male", homeworld:'planet', homeworldName: 'sun'   }]);
    expect(result.current[0].isLoading).toBe(false);
    expect(result.current[0].error).toBeUndefined();
  });

  it('handles CHARACTERLIST_ERROR action', () => {
    const { result } = renderHook(() => useReducer(charactersReducer, {} as CharactersStateList));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: 'CHARACTERLIST_ERROR', payload: 'Error message' });
    });

    expect(result.current[0].isLoading).toBe(false);
    expect(result.current[0].error).toBe('Error message');
  });

});
