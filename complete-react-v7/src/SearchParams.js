import { useState } from "react";

const SearchParams = () => {
  // const location = "Seattle, WA";
  const [location, setLocation] = useState("Cardiff, Wales");
  return (<div className="search-params">
      <form>
        <label htmlFor="location">
          Location:
          <input id="location" value={location} placeholder="location" onChange={(e) => setLocation(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>);
};

export default SearchParams;

