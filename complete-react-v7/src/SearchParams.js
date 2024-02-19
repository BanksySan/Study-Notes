import { useState, useEffect, useContext } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const ANIMALS = ["bird", "dog", "cat", "rabbit", "reptile"];

const SearchParams = () => {
  // const location = "Seattle, WA";

  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);
  useEffect(() => {
    requestPets().then(); // Empty `.then` due to warning over ignoring returned Promise.
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);

    const json = await res.json();

    setPets(json["pets"]);
  }

  return (<div className="search-params">
    <form>
      <label htmlFor="location">
        Location
        <input
          id="location"
          value={location}
          placeholder="location"
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <label htmlFor="animal">
        Animal
        <select
          id="animal"
          value={animal}
          onChange={(e) => {
            setAnimal(e.target.value);
            setBreed("");
          }}
          onBlur={(e) => {
            setAnimal(e.target.value);
            setBreed("");
          }}
        >
          <option />
          {ANIMALS.map((x) => (<option key={x} value={x}>
            {x}
          </option>))}
        </select>
      </label>
      <label htmlFor="breed">
        Breed
        <select
          id="breed"
          value={breed}
          onChange={(e) => {
            setBreed(e.target.value);
          }}
          onBlur={(e) => {
            setBreed(e.target.value);
          }}
        >
          <option />
          {breeds.map((x) => (<option key={x} value={x}>
            {x}
          </option>))}
        </select>
      </label>
      <label htmlFor="theme">
        Theme:  <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option key="red" value="red">Red</option>
        <option key="green" value="green">Green</option>
        <option key="blue" value="blue">Blue</option>
        <option key="#dafeba" value="#dafeba">David Ba.</option>
      </select>

      </label>
      <button type="submit" style={{ backgroundColor: theme }}>Submit</button>
    </form>
    <Results pets={pets} />
  </div>);
};

export default SearchParams;
