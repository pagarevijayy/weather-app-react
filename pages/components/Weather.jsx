import { useEffect, useState } from "react";
import Image from "next/image";

const localCache = {}; // used to cache the api call results

const Weather = () => {
  // state variables to store location and forecast data
  const [location, setLocation] = useState("");
  const [forecastData, setForecastData] = useState(null);

  // on component load get user's current location and show weather data
  useEffect(() => {
    getLocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // get current and 7d weather forecast based on location (city or lat-long). locally cache results.
  const getWeather = async (e, latLong = null) => {
    let locationValue = location?.toLowerCase();

    if (localCache[locationValue]) {
      setForecastData(localCache[locationValue]);
    } else {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=d132c2c3f7844fdab75160409232611&q=${
          latLong ? latLong : locationValue
        }&days=8&aqi=no&alerts=no`,
      );

      const data = await res.json();
      localCache[locationValue] = data;

      setLocation(data?.location?.name);
      setForecastData(data);
    }
  };

  // get user's current location (latitude/longitude); on success - get weather for current location
  const getLocation = () => {
    let successCallback = (pos) => {
      getWeather(null, pos?.coords?.latitude + "," + pos?.coords?.longitude);
    };

    let errorCallback = (pos) => {
      console.log("please allow location access!!"); // can be a better error handling / ux flow here.
    };

    //asking for persmissions
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "denied") {
            alert("Please allow location access.");
            window.location.href = "app-settings:location";
          } else {
            navigator.geolocation.getCurrentPosition(
              successCallback,
              errorCallback,
            );
          }
        });
    } else {
      alert("Geolocation is not supported in your browser.");
    }
  };

  //@todo: loading states and error handling can be better.
  return (
    <div className="container text-gray-800 backdrop-blur-sm bg-white/30 rounded-xl p-8 m-4 md:m-8 shadow max-w-md transform transition hover:-translate-y-0.5">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl"> ⛅️ Weather App</h1>
        <div className="m-1">
          <label htmlFor="location">
            <input
              id="location"
              name="location"
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              placeholder="e.g. Mumbai"
              className="bg-white rounded-md py-1 px-4 w-full my-4 text-gray-800 outline-none border border-gray-200 focus:border-purple-300 focus:ring-1 focus:ring-purple-300"
            />
          </label>
          <button
            onClick={getWeather}
            className="bg-red-600 text-slate-50 rounded py-1 px-4 w-full"
          >
            Search
          </button>
        </div>
        {forecastData?.current && (
          <div className="flex items-center gap-4 m-4 bg-white shadow rounded-lg p-4 w-72">
            <p className="text-lg">Today</p>
            <Image
              width={50}
              height={50}
              src={`https:${forecastData?.current?.condition?.icon}`}
              alt={forecastData?.current?.condition?.text}
            />
            <section>
              <p>Temp: {forecastData?.current?.temp_c}°C</p>
              <p className="text-xs">
                {forecastData?.current?.condition?.text}
              </p>
            </section>
          </div>
        )}

        <div className="space-y-4">
          {forecastData &&
            forecastData?.forecast?.forecastday?.map((data, idx) => {
              if (idx == 0) return <div key={data?.date_epoch}></div>;
              return (
                <div
                  key={data?.date_epoch}
                  className="flex gap-4 items-center m-4 bg-white shadow rounded-lg p-4 w-72"
                >
                  <p>
                    {new Date(data?.date)
                      .toDateString()
                      .split(" ")
                      .slice(1, -1)
                      .join(" ")}
                  </p>
                  <Image
                    width={50}
                    height={50}
                    src={`https:${data?.day?.condition?.icon}`}
                    alt={data?.day?.condition?.text}
                  />
                  <section>
                    <p>Temp: {data?.day?.avgtemp_c}°C</p>
                    <p className="text-xs">{data?.day?.condition?.text}</p>
                  </section>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Weather;
