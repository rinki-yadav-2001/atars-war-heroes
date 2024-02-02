
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import { CharactersProvider } from './core/context/characterListContext';
import HeroDetails from './components/HeroDetails';


const App: React.FC = () => {
  return (
    <Router>
    <CharactersProvider>
     <Routes>
         <Route path="/" element={<CharacterList />} />
       <Route path="/character/:id" element={<HeroDetails />} />
   </Routes>
 </CharactersProvider>
 </Router>
    
  );
};

export default App;
