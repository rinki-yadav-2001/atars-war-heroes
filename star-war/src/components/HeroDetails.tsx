import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchHeroDetails, fetchHomePlanet } from '../core/Api';
import {  HeroDetailsType } from '../types';
import './characterlist.css';

const HeroDetails: React.FC = () => {
    const [heroDetails, setHeroDetails] = useState<HeroDetailsType | null>(null);  
    const [isHeroDetailLoading, setHeroDetailLoading]= useState<boolean>(false)
    const { id } = useParams<{ id: string }>();
  
    useEffect(() => {
    const fetchData = async () => {
      setHeroDetailLoading(true)
      try {
        if (id !== undefined) {
          const heroData = await fetchHeroDetails(parseInt(id));
          setHeroDetails(heroData);
          console.log(heroData)
          if(heroData.length !== 0){
            const filmPromises = heroData?.films.map((film: string) =>
            fetch(film).then((response) => response.json())
          );
          const homePlanet= await fetchHomePlanet(heroData?.homeworld)
          const filmDetails = await Promise.all(filmPromises);
          setHeroDetails({...heroData, filmDetails, homePlanet})
          }
         
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally{
        setHeroDetailLoading(false)
      }
    };

 
    fetchData();
  }, [id]);
  console.log(heroDetails)

  
    if (isHeroDetailLoading ) {
      return <div className='loading'>Loading...</div>;
    }
  

    return (
      <div className='detail_wrapper'>
        <div className='hero-card'>
     <h2>{heroDetails?.name}</h2>
        <p><strong>Hair Color:</strong>: {heroDetails?.hair_color}</p>
        <p><strong>Eye Color:</strong> {heroDetails?.eye_color}</p>
        <p><strong>Gender:</strong> {heroDetails?.gender}</p>
        <p><strong>Planet:</strong> {heroDetails?.homePlanet?.name}</p>
        <h3>Films:</h3>
        <ul>
          {heroDetails?.filmDetails?.map((film, index) => (
            <li key={index}>
             
               {film.title}
            </li>
          ))}
        </ul>
     </div>   
      </div>
    );
  };
  
  export default HeroDetails;
  


