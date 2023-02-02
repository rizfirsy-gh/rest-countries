import "./Home.css";
import { useEffect, useState, useContext, Suspense } from "react";
import { Theme } from "../store/ThemeContext";
import { Link } from "react-router-dom";

const Card = ({ country }) => {
  const { name, flags, population, region, capital } = country;

  const { darkMode } = useContext(Theme);

  function detailHandler(ev) {}

  return (
    <div className={`card card-${darkMode ? "dark" : "light"}`}>
      <button className="button btn-details">
        <Link to="/" onClick={detailHandler}>
          Details
        </Link>
      </button>
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

function Home() {
  const [countries, setCountries] = useState([]);
  const [inputName, setInputName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState("-");

  const { darkMode } = useContext(Theme);

  function searchCountriesHandler(input, region) {
    setInputName(input);
    setRegion(region);
  }

  if (!inputName) {
    useEffect(() => {
      if (region === "-" && inputName === "") {
        fetch("https://restcountries.com/v3.1/all")
          .then((response) => response.json())
          .then((data) => setCountries((prev) => (prev = data)));
        setIsLoading(false);
      } else if (region) {
        fetch(`https://restcountries.com/v3.1/region/${region}`)
          .then((response) => response.json())
          .then((data) => setCountries((prev) => (prev = data)));
        setIsLoading(false);
      }
    }, [inputName, region]);
  } else if (inputName !== "") {
    //for input search
    useEffect(() => {
      async function getCountryByName() {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${inputName}`
        );
        const country = await response.json();
        setCountries(country);
      }

      getCountryByName();
    }, [inputName]);
  }

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
          {countries.length === 0 && isLoading && (
            <p className="loading">🌒🌔Loading...</p>
          )}
          {countries.length > 0 &&
            countries.map((country, index) => (
              <Card key={index} country={country} />
            ))}
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

export default Home;
//change commit author on laptop
