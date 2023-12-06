import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function CountryDetails() {
  const { countryId } = useParams();

  const [fetching, setFetching] = useState(true);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then(response => {
        setCountry(response.data);
        setFetching(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFetching(false);
      });
  }, [countryId]);

  return (
    <div>
      <h1>Country Details</h1>
      {fetching && <p> Loading ...</p>}
      {country && (
        <img
          src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
          alt='country-flag'
        />
      )}
      <h2>{country && country.name.common}</h2>
      <table className='table'>
        <tbody>
          <tr>
            <td style={{ width: '30%' }}>Capital</td>
            <td>{country && country.capital}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {country && country.area} km
              <sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul>
                {country &&
                  country.borders.map(border => (
                    <li key={border} style={{ listStyleType: 'none' }}>
                      <Link to={`/${border}`}>{border}</Link>
                    </li>
                  ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CountryDetails;
