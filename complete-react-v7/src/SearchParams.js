import { useState } from "react";

const ANIMALS = ["bird", "dog", "cat", "rabbit", "reptile"];

const SearchParams = () => {
  // const location = "Seattle, WA";

  const [location, setLocation] = useState("Cardiff, Wales");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const BREEDS = ["cocapoo", "whippet"];
  return (<div className="search-params">
    <form>
      <label htmlFor="location">
        Location
        <input id="location" value={location} placeholder="location" onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label htmlFor="animal">
        Animal
        <select id="animal"
                value={animal}
                onChange={(e) => {
                  setAnimal(e.target.value);
                  setBreed("");
                }}
                onBlur={(e) => {
                  setAnimal(e.target.value);
                  setBreed("");
                }}>
          <option />
          {ANIMALS.map((x) => (<option key={x} value={x}>
            {x}
          </option>))}
        </select>
      </label>
      <label htmlFor="breed">
        Breed
        <select id="breed"
                value={breed}
                onChange={(e) => {
                  setBreed(e.target.value);
                }}
                onBlur={(e) => {
                  setBreed(e.target.value);
                }}>
          <option />
          {BREEDS.map((x) => <option key={x} value={x}>{x}</option>)}
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>);
};

export default SearchParams;

