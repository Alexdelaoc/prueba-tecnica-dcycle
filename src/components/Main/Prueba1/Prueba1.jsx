import React, { useState } from "react";
import { useCustomFetch } from "../../../hooks/useCustomFetch";
import { v4 as uuidv4 } from 'uuid';

import loadingGif from "../../../assets/loading.gif"
import NameCard from "./NameCard/NameCard";

const Prueba1 = () => {
  const [name, setName] = useState(""); // Holds the value of the text input

  const { loading, info } = useCustomFetch("http://localhost:3200/api/genderize/", "http://localhost:3200/api/nationalize/", "http://localhost:3200/api/agify/", name)

  const handleSubmit = (event) => {
    event.preventDefault();
    setName(event.target.name.value);
  };

  const paintCard = () => {
    return info.map(item => (
      <NameCard key={uuidv4()} data={item} />
    ))
  };

  return (
    <section className="main__prueba1">
      <h3>Insert any name you can think of</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Any name" />
        <button type="submit">Search</button>
      </form>
      {loading ? <img src={loadingGif} className="loading-spinner" alt="spinner" /> : paintCard()}
    </section>
  );
};

export default Prueba1;
