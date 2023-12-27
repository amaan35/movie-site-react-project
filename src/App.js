import "./App.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import { Routes, Route } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import Detail from "./components/Detail";
import { createContext, useState } from "react";

const AppState = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <AppState.Provider value={{login, userName, setLogin, setUserName}}>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </div>
    </AppState.Provider>
  );
}

export default App;
export {AppState};
