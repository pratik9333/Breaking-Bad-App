import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const baseURl = "https://www.breakingbadapi.com/api/characters"; //Base URI to fetch data

const HomePage = () => {
  const [characters, setCharacters] = useState([]); // state use to store characters
  const [currentPage, setCurrentPage] = useState(1); // state use to store current page details
  const [postsPerPage] = useState(10); // state use to store maximum page details

  // Get Current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = characters.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // function that will get the data as soon as page loads
  const getData = () => {
    axios
      .get(baseURl)
      .then((response) => {
        if (response.status == 200) {
          setCharacters(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  //Function to check the category when clicking on dropdown and will update as per that
  const checkCategory = (e) => {
    let val = e.target.innerText;
    let category = val.split(" ").join("+");
    axios.get(baseURl + "?category=" + category).then((response) => {
      setCharacters(response.data);
    });
  };

  // UseEffect Hook
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
          <div className="dropdown">
            <div className="dropdown-button-sec">
              <label className="dropdown-button">
                <div className="dd-button">
                  <i className="fas fa-filter text-primary"></i> &nbsp;Filter
                  Category
                </div>

                <input type="checkbox" className="dd-input" id="test" />

                <ul className="dd-menu">
                  <li onClick={checkCategory} value="Breaking Bad">
                    Breaking Bad
                  </li>
                  <li onClick={checkCategory} value="Breaking Call Saul">
                    Better Call Saul
                  </li>
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
              {currentPosts.map((character) => (
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
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={characters.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default HomePage;
