import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import InfoCard from "./InfoCard/InfoCard";

const Prueba2 = () => {

  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(`http://localhost:3200/api/covid/historical`)
          .then((res) => {
            console.log(res.data.data);
            setInfo(res.data.data)
            setLoading(false)
          })
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []
  );

  const paintCards = () => {
    return info.map(item => <InfoCard key={uuidv4()} data={item} />)
  }

  return (
    <section>
      {info.length !== 0 ? paintCards() : ""}
    </section>
  )
};

export default Prueba2;
