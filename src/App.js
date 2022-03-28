import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Navigation from "./components/Navigation";
import { Home, Add, Edit, NotFound } from "./pages";

import { loadDataFB } from "./redux/modules/word";

import theme from "./theme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(loadDataFB());
  }, []);

  const list = useSelector((state) => state.word.list);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home list={list} />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
