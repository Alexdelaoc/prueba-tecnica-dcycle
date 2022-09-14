import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import InfoCard from "./InfoCard/InfoCard";
import loadingGif from "../../../assets/loading.gif"

const Prueba2 = () => {

  const [info, setInfo] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get("http://localhost:3200/api/covid/historical")
          .then((res) => {
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
  };

  return (
    <main className="prueba2__main">
      <h1 id="prueba2__main-title">The COVID Tracking Project</h1>
      {loading === false
        ? <section id="prueba2__main-section">
            <h3 id="prueba2__main-section-date">Data for {info[0].date} at the US</h3>
            <article className="prueba2__main-section-box">
              <h4>Cases</h4>
              <h5>Total cases: {info[0].cases.total.value}</h5>
              <p>New cases today: {info[0].cases.total.calculated.change_from_prior_day}</p>
              <p>Change over 7 days {info[0].cases.total.calculated.seven_day_change_percent}%</p>
            </article>

            <article className="prueba2__main-section-box">
              <h4>Tests</h4>
              <h5>Total tests: {info[0].testing.total.value}</h5>
              <p>New tests today: {info[0].testing.total.calculated.change_from_prior_day}</p>
              <p>Change over 7 days {info[0].testing.total.calculated.seven_day_change_percent}%</p>
            </article>

            <article className="prueba2__main-section-box">
              <h4>Outcomes</h4>
              <h5>Deaths: {info[0].outcomes.death.total.value}</h5>
              <p>Population percent: {info[0].outcomes.death.total.calculated.population_percent}%</p>
              <p>Last day deaths: {info[0].outcomes.death.total.calculated.change_from_prior_day} people</p>
            </article>
          </section>
        : <img src={loadingGif} className="loading-spinner" alt="spinner" />
      }
    </main>
  )
};

export default Prueba2;
