import React, { useState, useEffect } from "react";
import axios from "axios";

const Prueba1 = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          if (name != "") {
            // Setting the URL's
            const apiGender = `http://localhost:3200/api/genderize/${name}`;
            const apiNationality = `http://localhost:3200/api/nationalize/${name}`;
            const apiAge = `http://localhost:3200/api/agify/${name}`;

            // Axios
            const getGender = await axios.get(apiGender);
            const getNationality = await axios.get(apiNationality);
            const getAge = await axios.get(apiAge);

            // Receiving the API calls
            axios.all([getGender, getNationality, getAge])
              .then(axios.spread((...info) => {

                // Selecting desired information
                const info1 = info[0].data;
                const info2 = info[1].data;
                const info3 = info[2].data;

                // Combining it in one array
                const allData = [info1, info2, info3];

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

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Tu nombre"/>
        <button type="submit">Search</button>
      </form>
    </section>
  );
};

export default Prueba1;
