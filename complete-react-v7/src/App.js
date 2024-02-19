import React, { useState } from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  const theme = useState("#red");
  return (  <ThemeContext.Provider value={theme}>
    <BrowserRouter>
      <header>
        <Link to="/">
          <h1>Adopt Me</h1>
        </Link>
      </header>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
        <Route path="/" element={<SearchParams />} />
      </Routes>
    </BrowserRouter>
  </ThemeContext.Provider>);
};

render(<App />, document.getElementById("root"));
