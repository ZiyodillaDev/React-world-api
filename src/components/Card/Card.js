import { Link,NavLink } from "react-router-dom";

export const Card = ({ obj }) => {
  return (
    <div
      className="card shadow bg-light col-12 col-md-3 col-lg-4 mx-auto p-0"
      style={{ width: "18rem" }}
    >
      <li className="card p-0">
        <img
          className="card-img-top px-2 pt-2"
          src={obj?.flags?.svg}
          width="100%"
          height="150"
          alt={obj?.name?.common}
        />
        <div className="card-body border border-top-1">
          <h3 className="text-center pb-2">{obj?.name?.common}</h3>
          <p className="ps-3">
            <strong>Population</strong>: {obj?.population}
          </p>
          <p className="ps-3">
            <strong>Region</strong>: {obj?.region}
          </p>
          <p className="ps-3">
            <strong>Capital</strong>: {obj?.capital}
          </p>
        <Link className="text-decoration-none d-block btn btn-primary link" to={`/name/${obj?.name?.common}`}>View more...</Link>
        </div>
      </li>
    </div>
  );
};
