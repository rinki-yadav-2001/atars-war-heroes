 
  export type Film = {
    title: string;
    episode_id: number;
    director: string;
    producer: string;
    release_date: string;
  };
 export interface HeroDetailsType {
    name: string;
    gender: string;
    hair_color: string;
    eye_color: string;
    films: string[];
    filmDetails?: Film[]
    homePlanet?:HomePlanet,
    homeworld?: string;
    
  }

  export type HomePlanet = {
    name?: string;
  };
  
  export type Character = {
    homeworldName: string;
    name?: string;
    gender?: string;
    homeWorldData?: HomePlanet;
    hair_color?: string;
    eye_color?: string;
    films?: string[];
    homeworld: string;
  };
  
  
  export type CharactersStateList = {
    characters?: Character[]
    isLoading?: boolean;
    error?: string | null;
  };
  
  export type Action =
    | { type: 'LOADING_CHARACTER' }
    | { type: 'FETCH_CHARACTERS_LIST'; payload: Character[] }
    | { type: 'CHARACTERLIST_ERROR'; payload: string };
  
 
  
  export interface CharactersProviderProps {
    children: React.ReactNode;
  }
 



    
  
