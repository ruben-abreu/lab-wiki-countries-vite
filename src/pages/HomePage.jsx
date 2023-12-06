import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [fetching, setFetching] = useState(true);
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    axios
      .get('https://ih-countries-api.herokuapp.com/countries ')
      .then(response => {
        console.log(response.data);
        setCountries(response.data);
        setFetching(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFetching(false);
      }, []);
  });

  return (
    <div
      className='container'
      style={{ maxHeight: '90vh', overflow: 'scroll' }}
    >
      <h1 style={{ fontSize: '24px' }}>
        WikiCountries: Your Guide to the World
      </h1>
      {fetching && <p> Loading ...</p>}

      {countries &&
        countries.map(country => {
          return (
            <ul className='list-group' key={country._id}>
              <Link to={country.alpha3Code}>
                {' '}
                <li className='list-group-item list-group-item-action'>
                  <img
                    src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                    alt='country-flag'
                    width='40px'
                  />
                  <p> {country.name.common}</p>
                </li>
              </Link>
            </ul>
          );
        })}
    </div>
  );
}

export default HomePage;
