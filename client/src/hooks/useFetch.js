import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';
const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect( () => {
        const fetchData = async (url) => {
            setLoading(true);
            try{
                let resp = await axios.get(url);
                console.log(resp);
                setData(resp.data.result);
                setLoading(false);

                
            }catch(err){
                setError(err)
            }
        } 
        fetchData(url);
    }, [url]);

    return {data, loading, error};
}

export default useFetch