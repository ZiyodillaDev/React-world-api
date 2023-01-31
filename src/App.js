import { useState, useEffect, useRef } from "react";
import { Header } from "./components/Header";
import { Card } from "./components/Card";
import { SingleCountry } from "./components/SingleCountry";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/main.css";
import LoadingAnimation from "./assets/images/loading/loading.gif";
import { Routes, Route } from "react-router-dom";
function App() {
  let inputValue = useRef();
  let selectValue = useRef();

  const [counties, setCountries] = useState({
    isLoading: false,
    data: [],
    isError: "",
  });

  const getCountries = async (url) => {
    const response = await fetch(`https://restcountries.com/v3.1/${url}`);
    const data = await response.json();
    const err = await data;

    if (data) {
      setCountries({
        isLoading: false,
        data: data,
        isError: "",
      });
    } else if (err) {
      setCountries({
        isLoading: false,
        data: [],
        isError: err.message,
      });
    }
  };

  useEffect(() => {
    setCountries({
      isLoading: true,
      data: [],
      isError: "",
    });

    getCountries("all");
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    getCountries(`name/${inputValue.current.value}`);
  };

  const handleSelect = (evt) => {
    if (selectValue.current.value === "All") getCountries("all");
    else if (selectValue.current.value)
      getCountries(`region/${selectValue.current.value}`);
  };

  return (
    <>
      <Header />
      <main>
        <section className="postion-relative">
          <div className="container">
            <form className="d-flex my-5" onSubmit={(evt) => handleSubmit(evt)}>
              <div className="input-group w-50 shadow">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search by name"
                  ref={inputValue}
                />
                <button className="btn btn-light">🔍</button>
              </div>
              <select
                className="form-select ms-auto w-25 shadow"
                onChange={(evt) => handleSelect(evt)}
                ref={selectValue}
              >
                <option value="All">All</option>
                <option value="Africa">Africa</option>
                <option value="America">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>
            </form>
           <div>
           {counties.isError ? <h2>{counties.isError}</h2> : ""}
            {counties.isLoading ? (
              document.body.style.backgroundColor = "#383d3a",
              <Header style={{backgroundColor:"red"}}></Header>,
              <img
              width={500}
              height={500}
                src={LoadingAnimation}
                alt="Loading animation"
                style={{position:"absolute",top:"200px",bottom:"0",left:"0",right:"0",margin:"auto",zIndex:"999"}}
              />

            ) : (
              document.body.style.backgroundColor = "#fff",
              ""
            )}
            {counties.data.length ? (
              <ul className="row my-5 gy-4 list-unstyled">
                {counties.data.map((item) => (
                  <Card key={item.name.common} obj={item} />
                ))}
              </ul>
            ) : (
              ""
            )}
            <Routes>
          <Route
            path="/"
            element={<Card /> } 
          />
          <Route path="/name/:name" element={<SingleCountry/>} />
        </Routes>
           </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
