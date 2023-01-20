import "./App.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ image, name, population, region, capital }) => {
  return (
    <div>
      <div>
        <img src={image} alt={`${name} + flag`} />
      </div>
      <div>
        <h3>{name}</h3>
        <p className="country-detail">
          Population: <span>{population}</span>
        </p>
        <p className="country-detail">
          Region: <span>{region}</span>
        </p>
        <p className="country-detail">
          Capital: <span>{capital}</span>
        </p>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="header">
      <h2>Where in the world?</h2>
      <button>dark mode</button>
    </header>
  );
};

const Browser = () => {
  return (
    <section className="browser">
      <input name="search" type="text" />
      <select>
        <option>Filter by Region</option>
        <option>Africa</option>
        <option>Asia</option>
        <option>America</option>
        <option>Europe</option>
        <option>Oceania</option>
      </select>
    </section>
  );
};

function App() {
  useEffect(() => {
    const countries = fetch("https://restcountries.com/v3.1/all");
    console.log("countries :>> ", countries);
  });

  return (
    <div>
      <Header />
      <Browser />
      <div className="countries">
        <Card />
      </div>
    </div>
  );
}

export default App;
