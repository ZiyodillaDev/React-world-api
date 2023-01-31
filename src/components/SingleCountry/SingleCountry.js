
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const SingleCountry = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [countrys, setCountrys] = useState({
    isLoading: false,
    data: [],
    isError: '',
  });

  const getCountrys = () => {
    setCountrys({
      ...countrys,
      isLoading: true,
    });
    axios
      .get('https://restcountries.com/v3.1/name/' + name)
      .then((data) => {
        if (data.status === 200) {
          setCountrys({
            ...countrys,
            isLoading: false,
            data: data.data,
          });
        }
      })
      .catch((err) => {
        if (err) {
          setCountrys({
            ...countrys,
            isLoading: false,
            data: [],
            isError: err.message,
          });
        }
      });
  };

  useEffect(() => {
    getCountrys();
  }, []);

  return (
    <>
      <button onClick={() => navigate(-1)} className='btn btn-danger mx-4 my-4'>Back</button>

      {countrys.isLoading ? (
        <h2 className='text-center display-2 my-5 fw-bold'>Loading...</h2>
      ) : (
        ''
      )}
      {countrys.isError ? (
        <h2 className='text-danger text-center my-5'>{countrys.isError}</h2>
      ) : (
        ''
      )}
      {countrys.data ? (
        <div className='container mb-5 pb-5 mt-4'>
          {countrys.data.map((el) => (
            <div className='d-flex flex-column flex-md-row align-items-center justify-content-between'>
              <img
                src={el.flags.svg}
                alt='Country Img'
                width='560px'
                height='400px'
              />
              <div className='d-flex align-items-center justify-content-between w-50'>
                <div className='d-flex flex-column'>
                  <h2 className='mb-5 fw-bold text-center'>{el.name?.common}</h2>
                  <ul className='list-unstyled'>
                    <li>
                      <p className='fw-regular'>
                        Native Name:
                        <span className='fw-light'> {el.name?.common}</span>
                      </p>
                    </li>
                    <li>
                      <p className='fw-regular'>
                        Population:{' '}
                        <span className='fw-light'>{el.population}</span>
                      </p>
                    </li>
                    <li>
                      <p className='fw-regular'>
                        Region: <span className='fw-light'>{el.region}</span>
                      </p>
                    </li>
                    <li>
                      <p className='fw-regular'>
                        Sub Region:{' '}
                        <span className='fw-light'>{el?.subregion}</span>
                      </p>
                    </li>
                    <li>
                      <p className='fw-regular'>
                        Capital: <span className='fw-light'>{el?.capital}</span>
                      </p>
                    </li>
                  </ul>
                </div>
                <ul>
                  <li>
                    <p className='fw-regular'>
                      Top Level Domain:{' '}
                      <span className='fw-light'>{el.name?.common}</span>
                    </p>
                  </li>
                  <li>
                    <p className='fw-regular'>
                      Currencies:{' '}
                      <span className='fw-light'> {el.name?.common}</span>
                    </p>
                  </li>
                  <li>
                    <p className='fw-regular'>
                      Languages:{' '}
                      <span className='fw-light'>{el.name?.common}</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

