import React, { useState } from "react";

const InfoCard = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <article>
      <h4>{props.data.date}</h4>
      <div>
        <p>Total deaths: </p>
      </div>
      <button className="card__toggle" onClick={() => setOpen(!open)}>Show more</button>

      {open && 
      <div className="card__content">
        lololol
      </div>
      }
    </article>
  )
};

export default InfoCard;
