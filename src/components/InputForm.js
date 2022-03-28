import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDataFB,
  addWord,
  editDataFB,
  editWord,
} from "../redux/modules/word";
import "./styles/InputForm.css";

const InputForm = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, word, description, example, url } = data;

  const [sinjo, setSinjo] = useState(word);
  const [mean, setMean] = useState(description);
  const [exam, setExam] = useState(example);
  const [link, setLink] = useState(url);

  const concept = !id ? "추가" : "수정";

  const handleChange = (e) => {
    const { id } = e.target;
    const { value: text } = e.target;
    switch (id) {
      case "sin":
        setSinjo(text);
        break;
      case "mean":
        setMean(text);
        break;
      case "exam":
        setExam(text);
        break;
      default:
        setLink(text);
    }
  };

  const onSubmit = () => {
    if (concept === "추가") {
      // dispatch(
      //   addWord()
      // );
      dispatch(
        addDataFB({
          word: sinjo,
          description: mean,
          example: exam,
          url: link,
          heard: false,
        })
      );
    } else {
      dispatch(
        editDataFB({
          id: id,
          word: sinjo,
          description: mean,
          example: exam,
          url: link,
        })
      );
    }
    navigate("/");
  };

  return (
    <div className="total_wrap">
      <h2>{concept}하기</h2>
      <div className="input-box">
        <input id="sin" type="text" placeholder=" "></input>
        <label>신조어</label>
      </div>
      <div className="input-box">
        <input id="mean" type="text" placeholder=" "></input>
        <label>뜻/어원</label>
      </div>
      <div className="input-box">
        <input id="exam" type="text" placeholder=" "></input>
        <label>활용 예시</label>
      </div>
      <div className="input-box">
        <input id="url" type="text" placeholder=" "></input>
        <label>링크</label>
      </div>

      <button onClick={onSubmit}>{concept}</button>
    </div>
  );
};

export default InputForm;
