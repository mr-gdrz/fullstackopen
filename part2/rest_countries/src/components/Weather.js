import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [wdata, setWdata] = useState()
    const urlbase = 'http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_API_KEY_WEATHER + '&query=' + capital


    useEffect(() => {
        axios
            .get(urlbase)
            .then(response => setWdata(response.data.current))
    }, [])
    if (wdata === undefined) {
        return <p>Loading...</p>;
    } else {
        {console.log(wdata.temperature)}
        return (
            <div>
                tempreture : {wdata.temperature}
            </div>
        )
    }
}

    export default Weather;