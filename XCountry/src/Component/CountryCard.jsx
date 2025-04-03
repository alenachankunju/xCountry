import { useEffect, useState } from "react";

const API_ENDPOINT = "https://xcountries-backend.azurewebsites.net/all";

const Card = ({ country }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "200px",
        height: "200px",
        border: "1px solid grey",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
        borderRadius: "10px",
      }}
    >
      <img width="100" src={country.flag} alt={`Flag of ${country.name}`} />
      <p>{country.name}</p>
    </div>
  );
};

function CountryCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCountry();
  }, []);

  return (
    <>
      {data.length > 0 ? (
        data.map((item, index) => <Card key={index} country={item} />)
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default CountryCard;
