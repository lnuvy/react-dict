import Card from "components/Card";
import React from "react";

const Home = () => {
  const list = [
    {
      id: "12345555",
      word: "ㅎ1ㅎ1",
      description: "히히를 변현한 단어...",
      example: "저 친구가 초콜릿을 줬어. ㅎ1ㅎ1",
    },
    {
      id: "22222222",
      word: "ㅎ1ㅎ1",
      description: "히히를 변현한 단어...",
      example: "저 친구가 초콜릿을 줬어. ㅎ1ㅎ1",
    },
    {
      id: "16800000",
      word: "ㅎ1ㅎ1",
      description: "히히를 변현한 단어...",
      example: "저 친구가 초콜릿을 줬어. ㅎ1ㅎ1",
    },
  ];

  return (
    <div>
      {list.map((word, i) => {
        return <Card key={word.id} data={word} />;
      })}
    </div>
  );
};

export default Home;
