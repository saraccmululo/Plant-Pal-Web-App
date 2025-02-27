import { useState, useRef } from 'react';
import logo from './assets/logo-without-background.png';
import SearchBar from './components/SearchBar.jsx';
import PlantCard from './components/PlantCard.jsx';
import PlantList from './components/PlantList.jsx';
import Footer from './components/Footer.jsx';


export default function App() {
  const[searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  function handleSearch() {
    setSearchTerm(searchInputRef.current.value);
    searchInputRef.current.value ='';
  };

  return (
    <section className="container">
      <header>
        <figure className="logo-h1"> 
          <img src={logo} alt="Plant Pals Logo" className="logo" />
            <figcaption>
              <h1>My Plant Pals</h1>
            </figcaption>
        </figure>
        <h2>The help you need to manage your plant collection!</h2>
        <h3>Check the specific care guide for your plants by searching their names here:</h3>
      </header>
      <main>
        <SearchBar searchInputRef = {searchInputRef} onSearch={handleSearch}/>
        <PlantCard />
        <PlantList searchTerm={searchTerm}/>
      </main>
      <Footer />
    </section>
  );
}









