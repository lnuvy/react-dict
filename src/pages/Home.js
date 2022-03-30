import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Item from "../components/Item";
import { loadMoreFB } from "../redux/modules/word";
import { CardWrap, FilterBtn, FixBtn } from "../Styled";
import { BsFilterCircle } from "react-icons/bs";
import theme from "../theme";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.word.list);
  const lastDate = useSelector((state) => state.word.lastDate);

  // 인피니티 스크롤 state
  const [target, setTarget] = useState(null);

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
      {list.length
        ? list.map((word, i) => {
            const lastItem = i === list.length - 1;
            return (
              <Item
                key={word.id}
                data={word}
                ref={lastItem ? setTarget : null}
              />
            );
          })
        : null}

      <FixBtn
        onClick={() => {
          navigate("/add");
        }}
      >
        +
      </FixBtn>
      <FilterBtn>
        <BsFilterCircle size={55} />
        <div>
          <p>분홍색 카드만 보기</p>
          <p>보라색 카드만 보기</p>
          <p>초기화</p>
        </div>
      </FilterBtn>
    </CardWrap>
  );
};

export default Home;
