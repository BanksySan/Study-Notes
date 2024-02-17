import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";

const App = () => {
  return (<BrowserRouter>
    <header>
      <Link to="/">
        <h1>Adopt Me</h1>
      </Link>
    </header>
    <Routes>
      <Route path="/details/:id" element={<Details />} />
      <Route path="/" element={<SearchParams />} />
    </Routes>
  </BrowserRouter>);
};

render(<App />, document.getElementById("root"));
