import React from "react";
import { Link } from "react-router-dom";
import { useCharactersState } from "../core/context/characterListContext";
import './characterlist.css';

const CharacterList: React.FC = () => {
  const { characters, isLoading, error } = useCharactersState();
  console.log(characters)


  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="characterlist-wrapper">
      <h2 className="title">Star War  Heros</h2>
      <ul className="character-card-wrapper">
        {characters?.map((character, index) => (
          <div className="character-card" key={`${character.name} ${index}`}>
            <Link style={{textDecoration: "none"}} to={`/character/${index+1}`}>
              <h3 className="hero_name">{character?.name}</h3>
              <p className="hero_gender">{character?.gender}</p>
              <p className="hero_planet">{character?.homeworldName}</p>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
