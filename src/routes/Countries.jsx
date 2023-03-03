import "./Countries.css";
import Card from "../components/Card";
import Browser from "../components/Browser";
import { useEffect, useState, useContext, Suspense } from "react";
import { Theme } from "../store/ThemeContext";
import { Link, Outlet } from "react-router-dom";
import { getAllCountries, getByCountry } from "../components/libs/getCountries";

function Countries() {
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
        getAllCountries("https://restcountries.com/v3.1/all");
      } else if (region) {
      }
    }, [inputName, region]);
  } else if (inputName !== "") {
    useEffect(() => {
      getByCountry(inputName);
    }, [inputName]);
  }

  return (
    <div>
      {/* <Header /> */}
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
        <div>
          <Outlet />
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

export default Countries;
