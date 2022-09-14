import React, { useEffect, useState } from "react";
import axios from "axios";
import loadingGif from "../../../assets/loading.gif"

const Prueba2 = () => {

  const [info, setInfo] = useState([]);
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

  const addThousandsDots = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <main className="prueba2__main">
      <h1 id="prueba2__main-title">The COVID Tracking Project</h1>
      {/* <h3 id="prueba2__main-section-date">Data for {info[0].date} at the US</h3> */}
      <p>Not receiving new data since March 7, 2021</p>
      {loading === false
        ? <section id="prueba2__main-section">
            <article className="prueba2__main-section-box">
              <h4>Cases</h4>
              <h5>Total cases: {addThousandsDots(info[0].cases.total.value)}</h5>
              <p>New cases today: {addThousandsDots(info[0].cases.total.calculated.change_from_prior_day)}</p>
              <p>Change over 7 days {info[0].cases.total.calculated.seven_day_change_percent}%</p>
            </article>

            <article className="prueba2__main-section-box">
              <h4>Tests</h4>
              <h5>Total tests: {addThousandsDots(info[0].testing.total.value)}</h5>
              <p>New tests today: {addThousandsDots(info[0].testing.total.calculated.change_from_prior_day)}</p>
              <p>Change over 7 days {info[0].testing.total.calculated.seven_day_change_percent}%</p>
            </article>

            <article className="prueba2__main-section-box">
              <h4>Outcomes</h4>
              <h5>Deaths: {addThousandsDots(info[0].outcomes.death.total.value)}</h5>
              <p>Population percent: {info[0].outcomes.death.total.calculated.population_percent}%</p>
              <p>Last day deaths: {addThousandsDots(info[0].outcomes.death.total.calculated.change_from_prior_day)} people</p>
            </article>
          </section>
        : <img src={loadingGif} className="loading-spinner" alt="spinner" />
      }
    </main>
  )
};

export default Prueba2;
