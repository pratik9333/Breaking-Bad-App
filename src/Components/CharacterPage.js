import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const baseURl = "https://www.breakingbadapi.com/api";
const quoteURL = baseURl + "/quote";
const CharacterPage = (props) => {
  const [character, setCharacter] = useState({});
  const [quotes, setQuotes] = useState([]);
  const getCharacter = () => {
    let URL = baseURl + "/characters/" + props.match.params.id;
    axios.get(URL).then((response) => {
      console.log(response);
      setCharacter(response.data[0]);
      let name = response.data[0].name.split().join("+");
      axios.get(quoteURL + "?author=" + name).then((quotes) => {
        setQuotes(quotes.data);
      });
    });
  };
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
            <li>{character.name}</li>
            <li>{character.birthday}</li>
            <li>{character.occupation}</li>
            <li>{character.nickname}</li>
            <li>{character.portrayed}</li>
            <li>{character.appearance?.length}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
