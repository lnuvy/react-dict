import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Navigation from "./components/Navigation";
import { Home, Add, Edit, NotFound } from "./pages";
import theme from "./theme";
import { Container } from "./Styled";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadDataFB } from "./redux/modules/word";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDataFB());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App flex-column-s">
        <Navigation />
        <Container className="flex-column-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
