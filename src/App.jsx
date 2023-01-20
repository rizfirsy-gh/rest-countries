import "./App.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function getCountries(endpoint) {
  let countries;
  fetch(`https://restcountries.com/v3.1/name/${endpoint}`)
    .then((response) => response.json())
    .then((data) => (countries = data));

  return countries;
}

const Card = ({ country }) => {
  const { name, flags, population, region, capital } = country;

  return (
    <div className="card">
      <div className="flag">
        <img src={flags.svg} alt={`${name.official} + flag`} />
      </div>
      <div className="details">
        <h4 className="country-name">{name.official}</h4>
        <p className="country-detail">
          Population: <span className="detail">{population}</span>
        </p>
        <p className="country-detail">
          Region: <span className="detail">{region}</span>
        </p>
        <p className="country-detail">
          Capital:{" "}
          {capital === undefined ? (
            <span className="detail">-</span>
          ) : (
            capital.map((city, index) => (
              <span key={index} className="detail">
                {city}
              </span>
            ))
          )}
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
  function searchHandler(ev) {
    ev.preventDefault();
    const peru = getCountries("peru");
    console.log("peru", peru);
  }

  return (
    <section className="browser">
      <form className="search-form" onSubmit={searchHandler}>
        <input
          name="search"
          type="text"
          placeholder="search for a country..."
        />
        <button type="submit">Search</button>
      </form>
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
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries((prev) => (prev = data)));
  }, []);

  return (
    <div>
      <Header />
      <article className="container">
        <Browser />
        <div className="countries">
          {countries.map((country, index) => (
            <Card key={index} country={country} />
          ))}
        </div>
      </article>
    </div>
  );
}

export default App;
