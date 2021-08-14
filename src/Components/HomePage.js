import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const baseURl = "https://www.breakingbadapi.com/api/characters";
let timeout = null;
const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [searchcharacters, setSearchedCharacters] = useState([]);
  const getData = () => {
    axios.get(baseURl).then((response) => {
      setCharacters(response.data);
    });
  };
  const debounce = () => {
    let input = document.getElementById("my-input");
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      setSearchedCharacters(
        characters.filter((character) =>
          character.name.toLowerCase().includes(input.value.toLowerCase())
        )
      );
    }, 1000);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-class">
      <div className="main-class">
        <div className="heading-class">
          <h2>Breaking Bad Characters List</h2>
        </div>
        <div className="filter-class">
          <div className="search">
            <input
              type="text"
              className="input"
              placeholder="Search Character"
              id="my-input"
              onKeyUp={debounce}
            />
          </div>
          <div className="dropdown">
            <div className="dropdown-button-sec">
              <label className="dropdown-button">
                <div className="dd-button">
                  <i className="fas fa-filter text-primary"></i> &nbsp;Filter
                  Category
                </div>

                <input type="checkbox" className="dd-input" id="test" />

                <ul className="dd-menu">
                  <li>Action</li>
                  <li>Another action</li>
                  <li className="divider"></li>
                  <li>Doing work</li>
                </ul>
              </label>
            </div>
          </div>
        </div>
        <div className="table-class">
          <table
            className="table table-light table-hover text-center table-striped"
            style={{ cursor: "pointer" }}
          >
            <tbody>
              <tr>
                <th>Name</th>
                <th>Occupation</th>
                <th>Date Of Birth</th>
                <th>Status</th>
              </tr>
              {searchcharacters.length == 0
                ? characters.map((character) => (
                    <tr key={character.char_id}>
                      <td>
                        <Link to={"/character/" + character.char_id}>
                          {character.name}
                        </Link>
                      </td>
                      <td>{character.occupation}</td>
                      <td>
                        {character.birthday === "Unknown"
                          ? "-"
                          : character.birthday}
                      </td>
                      <td>{character.status}</td>
                    </tr>
                  ))
                : searchcharacters.map((character) => (
                    <tr key={character.char_id}>
                      <td>
                        <Link to={"/character/" + character.char_id}>
                          {character.name}
                        </Link>
                      </td>
                      <td>{character.occupation}</td>
                      <td>
                        {character.birthday === "Unknown"
                          ? "-"
                          : character.birthday}
                      </td>
                      <td>{character.status}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <div className="pagination justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a
                  className="page-link"
                  href="#"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
