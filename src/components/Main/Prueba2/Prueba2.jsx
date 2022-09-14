import React, { useEffect, useState } from "react";
import axios from "axios";
import loadingGif from "../../../assets/loading.gif"

const Prueba2 = () => {

  const [info, setInfo] = useState([]);
  const [date, setDate] = useState("");
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
    if (x === null) {
      return "N/A"
    } else {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  };

  // eslint-disable-next-line
  let index = info.findIndex(item => item.date == date);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.name.value);
    console.log(index)
    setDate(event.target.name.value);
  };

  return (
    <section className="prueba2__main">
      <h1 id="prueba2__main-title">The COVID Tracking Project</h1>

      {loading === false ? <h3 id="prueba2__main-section-date">Data for {info[0].date} at the US</h3> : ""}
      
      {loading === false ? <p>Not receiving new data since March 7, 2021</p> : ""}
      
      {loading === false
        ? <section id="prueba2__main-section">
            <article className="prueba2__main-section-box">
              <h4>Cases</h4>
              <h5>Total cases (Accumulative): {addThousandsDots(info[0].cases.total.value)}</h5>
              <p>New cases today: {addThousandsDots(info[0].cases.total.calculated.change_from_prior_day)}</p>
              <p>Change within the previous 7 days: {info[0].cases.total.calculated.seven_day_change_percent}%</p>
            </article>

            <article className="prueba2__main-section-box">
              <h4>Tests</h4>
              <h5>Total tests (Accumulative): {addThousandsDots(info[0].testing.total.value)}</h5>
              <p>New tests today: {addThousandsDots(info[0].testing.total.calculated.change_from_prior_day)}</p>
              <p>Change within the previous 7 days: {info[0].testing.total.calculated.seven_day_change_percent}%</p>
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

      {loading === false
      ? <form onSubmit={handleSubmit}>
          <label>Compare current data with selected day data</label>
          <input type="date" name="name" max="2021-03-07" min="2020-01-13"/>
          <button type="submit">Search</button>
        </form>
      : ""}

      {date
      ? <section id="prueba2__main-section">
          <article className="prueba2__main-section-box">
            <h4>Cases ({info[index].date})</h4>
            <h5>Total cases (Accumulative): {addThousandsDots(info[index].cases.total.value)}</h5>
            <p>New cases on that day: {addThousandsDots(info[index].cases.total.calculated.change_from_prior_day)}</p>
            <p>Change within the previous 7 days: {info[index].cases.total.calculated.seven_day_change_percent}%</p>
          </article>

          <article className="prueba2__main-section-box">
            <h4>Tests ({info[index].date})</h4>
            <h5>Total tests (Accumulative): {addThousandsDots(info[index].testing.total.value)}</h5>
            <p>New tests on that day: {addThousandsDots(info[index].testing.total.calculated.change_from_prior_day)}</p>
            <p>Change within the previous 7 days: {info[index].testing.total.calculated.seven_day_change_percent}%</p>
          </article>

          <article className="prueba2__main-section-box">
            <h4>Outcomes at ({info[index].date})</h4>
            <h5>Deaths: {addThousandsDots(info[index].outcomes.death.total.value)}</h5>
            <p>Population percent: {info[index].outcomes.death.total.calculated.population_percent}%</p>
            <p>Last day deaths: {addThousandsDots(info[index].outcomes.death.total.calculated.change_from_prior_day)} people</p>
          </article>
        </section>
      : ""}
    </section>
  )
};

export default Prueba2;
