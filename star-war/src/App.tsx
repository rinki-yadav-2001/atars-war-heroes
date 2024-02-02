
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import { CharactersProvider } from './core/context/characterListContext';

const App: React.FC = () => {
  return (
    <Router>
    <CharactersProvider>
     <Routes>
         <Route path="/" element={<CharacterList />} />
   </Routes>
 </CharactersProvider>
 </Router>
    
  );
};

export default App;
