import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Navigation from "./components/Navigation";
import { Home, Add, Edit, NotFound } from "./pages";

import { db } from "./firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { loadDataFB } from "./redux/modules/word";

import theme from "./theme";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(async () => {
    console.log(db);
    dispatch(loadDataFB());
    // 가져오기
    // const query = await getDocs(collection(db, "dicts"));
    // console.log(query);
    // query.forEach((doc) => {
    //   console.log(doc.id, doc.data());
    // });

    // 추가하기
    // addDoc(collection(db, "dicts"), { id: "dkdlel123123", word: "ㅎ2ㅎ2" });

    // 수정하기 (없는 key:value 도 들어감 )
    // const docRef = doc(db, "dicts", "Ab6B6B6Qog2KxSK4HboF");
    // updateDoc(docRef, { description: "gkgkgk" });

    // 삭제하기
    // const docRef = doc(db, "dicts", "Ab6B6B6Qog2KxSK4HboF");
    // deleteDoc(docRef);

    // 선언한 컬렉션이 없으면 생성후 만들어줌 (몽고db와 유사)
    // addDoc(collection(db, "buckes"), { text: "new", completed: true });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
