import { Action, CharactersStateList } from "../../types";

const charactersReducer = (state: CharactersStateList, action: Action): CharactersStateList => {
    switch (action.type) {
      case 'LOADING_CHARACTER':
        return { ...state, isLoading: true, error: null };
      case 'FETCH_CHARACTERS_LIST':
        return { ...state, characters: action.payload, isLoading: false };
      case 'CHARACTERLIST_ERROR':
        return { ...state, isLoading: false, error: action.payload };
      default:
        return state;
    }
  };
  export default charactersReducer;