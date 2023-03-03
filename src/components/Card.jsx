const Card = ({ country }) => {
  const { name, flags, population, region, capital } = country;

  const { darkMode } = useContext(Theme);

  function detailHandler(ev) {}

  return (
    <div className={`card card-${darkMode ? "dark" : "light"}`}>
      <button className="button btn-details">
        <Link to="countries/2" onClick={detailHandler}>
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

export default Card;
