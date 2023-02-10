import { Link, useParams } from "react-router-dom";
import React from "react";

const Details = () => {
  const { id } = useParams();
  return (
    <div>
      Details {id}
      <Link to="/countries">back</Link>
    </div>
  );
};

export default Details;
