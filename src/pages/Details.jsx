import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import styles from "./Details.module.css";
import React from "react";

const Details = () => {
  const country = useLoaderData();

  console.log("country :>> ", country);
  return (
    <div>
      Details Page
      <button>
        <Link to="/">{"<-"} Back</Link>
      </button>
    </div>
  );
};

export default Details;
