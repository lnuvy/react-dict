import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Item from "../components/Item";
import { loadMoreFB } from "../redux/modules/word";
import { CardWrap, FixBtn } from "../Styled";

const Home = () => {
  const list = useSelector((state) => state.word.list);
  const lastDate = useSelector((state) => state.word.lastDate);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [target, setTarget] = useState(null);

  const [check, setCheck] = useState(false);

  useEffect(() => {
    let options = {
      threshold: "1",
    };
    let handleIntersection = async ([entries], observer) => {
      if (!entries.isIntersecting) {
        return;
      } else {
        await dispatch(loadMoreFB(lastDate));
        observer.unobserve(entries.target);
      }
    };
    // 새로운 observer 생성
    const io = new IntersectionObserver(handleIntersection, options);
    if (target) io.observe(target);

    return () => io && io.disconnect();
  }, [target]);

  return (
    <CardWrap className="flex-row-start">
      {list.map((word, i) => {
        const lastItem = i === list.length - 1;
        return (
          <Item key={word.id} data={word} ref={lastItem ? setTarget : null} />
        );
      })}

      <FixBtn
        onClick={() => {
          navigate("/add");
        }}
      >
        +
      </FixBtn>
      <FixBtn
        style={{ background: "tomato", right: "100px" }}
        onClick={() => {
          setCheck(!check);
        }}
      >
        {check ? "체크보기" : "none체크 보기"}
      </FixBtn>
    </CardWrap>
  );
};

export default Home;
