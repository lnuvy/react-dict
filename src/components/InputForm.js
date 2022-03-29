import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDataFB, editDataFB } from "../redux/modules/word";
import { InputWrap } from "../Styled";

const InputForm = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = data;

  const [inputs, setInputs] = useState({ data }.data);

  const concept = !id ? "추가하기" : "수정하기";

  const handleChange = (e) => {
    const { id } = e.target;
    const { value: text } = e.target;
    setInputs((values) => ({ ...values, [id]: text }));
  };

  const onSubmit = () => {
    if (concept === "추가하기") {
      dispatch(
        addDataFB({ date: new Date().getTime() + "", ...inputs, heard: false })
      );
    } else {
      dispatch(editDataFB(inputs));
    }
    navigate("/");
  };

  return (
    <InputWrap>
      <h2>{concept}</h2>
      <div className="input-box">
        <input
          id="word"
          type="text"
          placeholder=" "
          value={inputs.word}
          onChange={handleChange}
        ></input>
        <label>신조어</label>
      </div>
      <div className="textarea-box">
        <textarea
          id="description"
          type="text"
          placeholder=" "
          value={inputs.description}
          onChange={handleChange}
        ></textarea>
        <label>뜻/어원</label>
      </div>
      <div className="textarea-box">
        <textarea
          id="example"
          type="text"
          placeholder=" "
          value={inputs.example}
          onChange={handleChange}
        ></textarea>
        <label>활용 예시</label>
      </div>
      <div className="input-box">
        <input
          id="url"
          type="text"
          placeholder=" "
          value={inputs.url}
          onChange={handleChange}
        ></input>
        <label>링크</label>
      </div>

      <button onClick={onSubmit}>{concept}</button>
    </InputWrap>
  );
};

export default InputForm;
