import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const baseURl = "https://www.breakingbadapi.com/api"; // Base URL

const quoteURL = baseURl + "/quote"; // Appending Quote to  URL to fetch quotes

const CharacterPage = (props) => {
  const [character, setCharacter] = useState({}); // State for saving particular character
  const [quotes, setQuotes] = useState([]); // state for saving quotes of that character

  const getCharacter = () => {
    let URL = baseURl + "/characters/" + props.match.params.id; // Appending id to URL

    axios.get(URL).then((response) => {
      setCharacter(response.data[0]); // setting character details to character

      //Quotes Sec
      let name = response.data[0].name.split().join("+"); // splitting the name and joining it with +
      axios.get(quoteURL + "?author=" + name).then((quotes) => {
        setQuotes(quotes.data);
      });
    });
  };

  //Use Effect Hook for fetching details on reload page
  useEffect(() => {
    getCharacter();
  }, []);

  return (
    <div className="container-class">
      <h1 className="text-center">Character Details</h1>
      <div className="main-class-character">
        <div className="img-class">
          <img src={character.img} alt="Image-class" className="img-fluid" />
        </div>
        <div className="info-character">
          <Link to="/">
            <button id="btnReload">Back</button>
          </Link>
          <ul className="rolldown-list" id="myList">
            <li>
              <span className="text-uppercase">Name</span>
              <span>{character.name}</span>
            </li>
            <li>
              <span className="text-uppercase">Birthday</span>
              <span>{character.birthday}</span>
            </li>
            <li>
              <span className="text-uppercase">Occupation</span>
              <span>{character.occupation}</span>
            </li>
            <li>
              <span className="text-uppercase">Nickname</span>
              <span>{character.nickname}</span>
            </li>
            <li>
              <span className="text-uppercase">Portrayed</span>
              <span>{character.portrayed}</span>
            </li>
            <li>
              <span className="text-uppercase">Number of Seasons Appeared</span>
              <span>{character.appearance?.length}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="quotes-class">
        <div className="quotes-heading">
          <h2 className="text-center">Quotes By Character</h2>
        </div>
        <div className="quotes">
          <ul className="rolldown-list text-center" id="myList">
            {quotes.length != 0 ? (
              quotes.map((quotes) => <li>" {quotes.quote} "</li>)
            ) : (
              <span className="text-center display-4">No Quotes :(</span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
