import React, { useState } from "react";

const InfoCard = (props) => {
  const [open, setOpen] = useState(false);
  return(
    <article>
      <h4>{props.data.date}</h4>
      <button className="card__toggle" onClick={() => setOpen(!open)}>Show more</button>
      { open && <article className="card__content">Some content</article> }
    </article>
  )
};

export default InfoCard;
