import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

import NameCard from "./NameCard/NameCard";

const Prueba1 = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  useEffect(
    () => {
      const fetchData = async () => {

        // MISSING VALIDATIONS
        try {
          if (name !== "") {

            // Axios. Usually the API URLs should be in environment variables (process.env.REACT_APP_gender_url, etc...)
            const getGender = await axios.get(`http://localhost:3200/api/genderize/${name}`);
            const getNationality = await axios.get(`http://localhost:3200/api/nationalize/${name}`);
            const getAge = await axios.get(`http://localhost:3200/api/agify/${name}`);

            // Receiving the API calls
            axios.all([getGender, getNationality, getAge])
              .then(axios.spread((...info) => {

                // Selecting desired information
                const info1 = info[0].data;
                const info2 = info[1].data;
                const info3 = info[2].data;

                // Combining it in one array
                const allData = [
                  {
                    name: info1.name,
                    gender: info1.gender,
                    probability: info1.probability,
                    possible_nationalities: info2.country,
                    possible_age: info3.age
                  }
                ];
                console.log(allData);

                // Setting the state
                setData(allData);
              }))
          }
        } catch (e) {
          console.log(e);
          setName("");
        }
      }
      fetchData()
    }, [name]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setName(event.target.name.value);
  };

  const paintCard = () => {
    return data.map(item => (
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
      {data.length !== 0 ? paintCard() : ""}
    </section>
  );
};

export default Prueba1;
