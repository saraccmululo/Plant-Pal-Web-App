import './App.css';
import SearchBar from './components/SearchBar.jsx';
import PlantCard from './components/PlantCard';
import PlantList from './components/PlantList.jsx';



export default function App() {
  return (
    <section className="container">
      <header>
        <h1>Plant Pals</h1>
        <h2>Start managing your plant collection today!</h2>
        <h3>Add the plants you have in your collection here and have access to </h3>
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









