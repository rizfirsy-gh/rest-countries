import axios from "axios";

export function getAllCountries(url) {
  try {
    axios.get(url);
  } catch (error) {
    alert(`Uh oh, something went wrong! ${error}`);
  }
}

export function getByCountry(countryName) {
  try {
    axios.get(`https://restcountries.com/v3.1/region/${countryName}`);
  } catch (error) {
    alert(`Uh oh, something went wrong! ${error}`);
  }
}
