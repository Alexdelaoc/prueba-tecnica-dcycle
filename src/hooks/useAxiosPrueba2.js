import { useState, useEffect } from "react";
import axios from "axios";


export const useAxiosPrueba2 = () => {
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState([]);

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

    useEffect(() => {
        fetchData();
      }, [] // Only gets triggered once the component is first rendered, and never again.
      );

    return { loading, info }
}