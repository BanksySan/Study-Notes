import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Pet name="Daisy" animal="Dog" breed="Cockapoo" />
      <Pet name="Blue" animal="Dog" breed="Whippet" />
      <Pet name="Willow" animal="Cat" breed="Grumpy" />
    </div>
  );
};

render(<App />, document.getElementById("root"));
