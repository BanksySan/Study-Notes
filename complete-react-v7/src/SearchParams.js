import { useState, useEffect } from "react";
import Pet from "./Pet";

const ANIMALS = ["bird", "dog", "cat", "rabbit", "reptile"];

const SearchParams = () => {
  // const location = "Seattle, WA";

  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const BREEDS = ["cocapoo", "whippet"];
  const [pets, setPets] = useState([]);

  useEffect(() => {
    requestPets(); // Empty `.then` due to warning over ignoring returned Promise.
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
    );

    const json = await res.json();

    setPets(json["pets"]);
  }

  return (
    <div className="search-params">
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
            {ANIMALS.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
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
            {BREEDS.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      {pets.map((pet) => {
        const petName = pet.name;
        const petAnimal = pet.animal;
        const petBreed = pet.breed;
        return (
          <Pet
            name={petName}
            animal={petAnimal}
            breed={petBreed}
            key={JSON.stringify({ petName, petAnimal, petBreed })}
          />
        );
      })}
    </div>
  );
};

export default SearchParams;
