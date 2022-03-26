import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addWord, editWord } from "../redux/modules/word";
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
      dispatch(
        addWord({ word: sinjo, description: mean, example: exam, url: link })
      );
    } else {
      dispatch(
        editWord({
          id: id,
          word: sinjo,
          description: mean,
          example: exam,
          url: link,
        })
      );
    }
    navigate(-1);
  };

  return (
    <div className="total_wrap">
      <h2>{concept}하기</h2>
      <p>신조어</p>
      <input id="sin" type="text" value={sinjo} onChange={handleChange} />
      <p>뜻/어원</p>
      <input id="mean" type="text" value={mean} onChange={handleChange} />
      <p>활용 예시</p>
      <input id="exam" type="text" value={exam} onChange={handleChange} />
      <p>링크</p>
      <input id="url" type="text" value={link} onChange={handleChange} />
      <button onClick={onSubmit}>{concept}</button>
    </div>
  );
};

export default InputForm;
