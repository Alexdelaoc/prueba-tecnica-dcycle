import { useState, useEffect } from "react";
import axios from "axios";


export const useCustomFetch = (...args) => {

  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);

  useEffect(
    () => {
      async function fetchData() {
        
        if (args.length === 1) {
          try {
            axios.get(args[0])
              .then((res) => {
                setInfo(res.data.data);
                setLoading(false);
              })
          } catch (e) {
            console.log(e);
          };
  
        } else {

          // For not showing the loading spinner by default.
          setLoading(false);

          try {
            if (args[3] !== "") {

              setLoading(true); // Changing value of loading state while the query's being done.

              // Axios. Arguments will be an URL + the state that sets the HTTP request.
              const getGender = await axios.get(args[0] + args[3]);
              const getNationality = await axios.get(args[1] + args[3]);
              const getAge = await axios.get(args[2] + args[3]);
  
              // Receiving the API calls.
              axios.all([getGender, getNationality, getAge])
                .then(axios.spread((...info) => {
  
                  // Selecting desired information.
                  const info1 = info[0].data;
                  const info2 = info[1].data;
                  const info3 = info[2].data;
  
                  // Combining it in one array.
                  const allData = [
                    {
                      name: info1.name,
                      gender: info1.gender,
                      probability: info1.probability,
                      possible_nationalities: info2.country,
                      possible_age: info3.age
                    }
                  ];
  
                  // Setting the states
                  setInfo(allData);
                  setLoading(false)
                }))
            }
          } catch (e) {
            console.log(e);
            setLoading(false)
          };
        }
      }
      fetchData();
      // eslint-disable-next-line
    }, [...args]
  )
  return { loading, info }
}