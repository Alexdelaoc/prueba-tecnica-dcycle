import React from "react";
import { v4 as uuidv4 } from 'uuid';

const NameCard = (props) => {

  const paintNationalities = () => {
    return props.data.possible_nationalities.map(nationality => (
      <article key={uuidv4()} className="main__prueba1-card-nationalities">
        <h4>Nationality: {nationality.country_id}</h4>
        <p>Probability: {nationality.probability}</p>
      </article>
    ))
  };

  return (
    <section className="main__prueba1-card">
      <h3 className="main__prueba1-card-name">{props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1).toLowerCase()}</h3>
      <article className="main__prueba1-card-name">
        <p>Gender: {props.data.gender === null ? "Couldn't guess the gender, sorry!" : props.data.gender}</p>
        <p>Gender probability: {props.data.probability === 0 ? "Couldn't guess the gender probability, sorry!" : props.data.probability}</p>
        <p>Age: {props.data.possible_age === null ? "Couldn't guess the age, sorry!" : props.data.possible_age}</p>
      </article>
      <article>
        {props.data.possible_nationalities.length !== 0 ? paintNationalities() : "Couldn't guess the nationality, sorry!"}
      </article>
    </section>
  )
};

export default NameCard;
