import { Theme } from "../store/ThemeContext";
import { useState, useContext } from "react";

const Browser = ({ searchCountries, context }) => {
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

export default Browser;
