import React from "react";
import { v4 as uuidv4 } from 'uuid';

const NameCard = (props) => {

  const paintNationalities = () => {
    return props.data.possible_nationalities.map(nationality => (
      <div key={uuidv4()} className="main__prueba1-card-section-box-nationalities">
        <h4 className="main__prueba1-card-nationalities-h4">Nationality: {nationality.country_id}</h4>
        <img src={`https://flagcdn.com/${nationality.country_id.toLowerCase()}.svg`} alt={`${nationality.country_id}`} className="main__prueba1-card-section-box-nationalities-flag" />
        <p>Probability: {nationality.probability * 100 + "%"}</p>
      </div>
    ))
  };

  return (
    <section className="main__prueba1-card">
      <h3 className="main__prueba1-card-name">{props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1).toLowerCase()}</h3>

      <article className="main__prueba1-card-section">
        <div className="main__prueba1-card-section-box">
          {props.data.gender === null
            ? <p className="main__prueba1-card-section-box-error"> Couldn't guess the gender, sorry! </p>
            : <p className="main__prueba1-card-section-box-success"> Gender: {props.data.gender.charAt(0).toUpperCase() + props.data.gender.slice(1).toLowerCase()} </p>}

          {props.data.probability === 0
            ? <p className="main__prueba1-card-section-box-error"> Couldn't guess the gender probability, sorry! </p>
            : <p className="main__prueba1-card-section-box-success"> Gender probability: {props.data.probability * 100 + "%"} </p>}

          {props.data.possible_age === null
            ? <p className="main__prueba1-card-section-box-error"> Couldn't guess the age, sorry! </p>
            : <p className="main__prueba1-card-section-box-success"> Age: {props.data.possible_age} </p>}
        </div>

        <article className="main__prueba1-card-section-box">
          {props.data.possible_nationalities.length !== 0 ? paintNationalities() : <p className="main__prueba1-card-section-box-error">Couldn't guess the nationality, sorry!</p>}
        </article>

      </article>
    </section>
  )
};

export default NameCard;
