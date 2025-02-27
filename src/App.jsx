//import './App.css';
import SearchBar from './components/SearchBar.jsx';
import PlantCard from './components/PlantCard.jsx';
import PlantList from './components/PlantList.jsx';
import Footer from './components/Footer.jsx';


export default function App() {
  return (
    <section className="container">
      <header>
        <h1>Plant Pals</h1>
        <h2>Start managing your plant collection today!</h2>
        <h3>Check their needs by adding your plants here:</h3>
      </header>
      <main>
      <SearchBar />
      <PlantCard />
      <PlantList />
      </main>
      <Footer />
    </section>
  );
}









