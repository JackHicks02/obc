import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, ChakraProvider, Stack } from "@chakra-ui/react";
import TableWrapper from "./components/spreadsheet/TableWrapper";
import Map from "./components/map/TheMap";
import TheMap from "./components/map/TheMap";
import DataDisplay from "./pages/DataDisplay";
import { MapProvider } from "./components/map/MapContext";

import Home from "./pages/Home";
import MainPage from "./pages/MainPage";

function App() {
  {
    /* potential bug that can't be recreated consistently is that one of my set states isn't a function, this shouldn't happen aslong
      as there is no live update to the code*/
  }

  return (
    <ChakraProvider>
      <MapProvider>
        <MainPage />
      </MapProvider>
    </ChakraProvider>
  );
}

export default App;
