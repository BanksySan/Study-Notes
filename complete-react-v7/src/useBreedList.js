import { useState, useEffect } from "react";

const localCache = {};

const STATUS_STRINGS = {
  loading: "Loading", loaded: "Loaded", unloaded: "Unloaded"
};
export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState(STATUS_STRINGS.unloaded);

  useEffect(() => {
    console.log("Status", status);
  }, [status]);

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList().then();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus(STATUS_STRINGS.loading);

      const res = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
      const json = await res.json();
      console.log(res.url, json)

      localCache[animal] = json["breeds"] || [];
      setBreedList(localCache[animal]);
      setStatus(STATUS_STRINGS.loaded);
    }
  }, [animal]);

  return [breedList, status];
}

