import "./App.css";
import { useEffect, useState, useContext } from "react";
import { Theme } from "./store/ThemeContext";

function getCountriesByRegion(region) {
  fetch(`https://restcountries.com/v3.1/region/${region}`).then((response) => {
    if (!response.ok) throw alert("Countries not found with that filter!");
    return response.json();
  });
}

const Card = ({ country }) => {
  const { name, flags, population, region, capital } = country;

  const { darkMode } = useContext(Theme);

  return (
    <div className={`card card-${darkMode ? "dark" : "light"}`}>
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
  const { darkMode, toggleDarkMode } = useContext(Theme);
  function toggleTheme() {
    toggleDarkMode();
  }
  return (
    <header className={`header header-${darkMode ? "dark" : "light"}`}>
      <h2>Where in the world?</h2>
      <button
        className={`button button-${darkMode ? "dark" : "light"}`}
        onClick={toggleTheme}
      >
        {darkMode ? "🌒dark" : "🌖light"}
      </button>
    </header>
  );
};

const Browser = ({ searchCountries }) => {
  const [input, setInput] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("-");

  const { darkMode } = useContext(Theme);

  function searchHandler(ev) {
    ev.preventDefault();
    searchCountries(input, selectedRegion);
  }

  function onChangeRegion(ev) {
    setSelectedRegion(ev.target.value);
  }

  function changeInputHandler(ev) {
    setInput(ev.target.value);
  }

  return (
    <section className="browser">
      <form className="search-form">
        <input
          className={`search search-${darkMode ? "dark" : "light"}`}
          name="search"
          type="text"
          placeholder="Try Indonesia..."
          value={input}
          onChange={changeInputHandler}
        />
        <select
          className={`region region-${darkMode ? "dark" : "light"}`}
          value={selectedRegion}
          onChange={onChangeRegion}
        >
          <option value="-">All Region</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="america">America</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
        <button
          className={`button button-${darkMode ? "dark" : "light"}`}
          type="submit"
          onClick={searchHandler}
        >
          Search
        </button>
      </form>
    </section>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("-");

  console.log("typeof countries :>> ", typeof countries);

  const { darkMode } = useContext(Theme);

  function searchCountriesHandler(input, region) {
    setInput(input);
    setRegion(region);
  }

  useEffect(() => {
    if (region === "-" && input === "") {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => setCountries((prev) => (prev = data)));
    } else if (region) {
      fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then((response) => response.json())
        .then((data) => setCountries((prev) => (prev = data)));
    }
  }, [countries, input, region]);

  return (
    <div>
      <Header />
      <article className={`container container-${darkMode ? "dark" : "light"}`}>
        <Browser searchCountries={searchCountriesHandler} />
        <p>
          Showing you{" "}
          <span className="total-countries">{countries.length}</span> countries
          around the world.
        </p>
        <div className="countries">
          {countries
            ? countries.map((country, index) => (
                <Card key={index} country={country} />
              ))
            : "loading..."}
        </div>
      </article>
      <footer className="footer">
        <p>
          Make with ☕ by{" "}
          <a href="https://instagram.com/rizfirsy.dev">@rizfirsy.dev</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
