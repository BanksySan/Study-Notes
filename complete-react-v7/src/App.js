import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, {
      name: "Daisy",
      animal: "Dog",
      breed: "Cockapoo",
    }),
    React.createElement(Pet, { name: "Blue", animal: "Dog", breed: "Whippet" }),
    React.createElement(Pet, {
      name: "Willow",
      animal: "Cat",
      breed: "Grumpy",
    }),
  );
};

render(React.createElement(App), document.getElementById("root"));
