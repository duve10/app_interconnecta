import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    axios
      .get(url,{
        headers: {
            Authtoken: "9a04d885d66c8a95527220df7ca805",
          },
      }
        )
      .then((response) => {
        setData(response.data);
        
      })
      .catch((err) => {
        setError(err);
      })
  }, [url]);

  const refetch = () => {
    
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
  };

  return { data, error, refetch };
}

export default useFetch;